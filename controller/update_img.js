const userImage = require("../model/userprofile");
const fs = require("fs");
const CustomError = require("../utils/customerr");

const updateImage = async (req, res, next) => {
  const id = req.params.id;
  const oldFile = req.params.imageName;

  try {
    // Check if a file was uploaded
    if (!req.files || req.files.length === 0) {
      // return res.status(400).send("No files were uploaded.");
      const err=new CustomError(400,'No files were uploaded.')
      return next(err);
    }

    const newFile = req.files[0];

    const imagesFolderPath = 'E:/pdf_to_img/images';
    const newImagePath = `${imagesFolderPath}/${newFile.originalname}`;

    // Check if the new image file exists
    const isImageExists = await fs.promises.access(newImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!isImageExists) {
      // return res.status(404).send("New image file not found in the Extracted image folder");
      const err=new CustomError(404,'New image file not found in the Extracted image folder')
      return next(err);
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/images/`;
    const imageUrl = `${baseUrl}${oldFile}`;

    // Find the existing image record
    const existingImage = await userImage.findOne({
      where: {
        user_id: id,
        image_url: imageUrl
      }
    });

    if (!existingImage) {
      // return res.status(404).send("Image not found or not associated with the specified URL");
      const err=new CustomError(404,'Image not found in the database');
      return next(err);
    }

    // Check if the new file is already associated with the user
    const isDuplicateFile = await userImage.findOne({
      where: {
        user_id: id,
        image_url: `${baseUrl}${newFile.originalname}`
      }
    });

    if (isDuplicateFile) {
      // return res.status(400).send("The given file is already present in the specified user image folder");
      const err=new CustomError(400,'The given file is already present in the specified user image folder');
      return next(err);
    }

    // Update the image URL
    existingImage.image_url = `${baseUrl}${newFile.originalname}`;
    await existingImage.save();

    res.status(200).json({
      statuscode:200,
      status:'success',
      message:'Image updated successfully'
    })
  } catch (error) {
    // res.status(500).send("An error occurred while updating the image");
    const err=new CustomError(500,error.message);
      return next(err);
  }
};

module.exports = updateImage;