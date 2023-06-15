const UserImage = require("../model/userprofile");
const fs = require('fs');
const CustomError = require("../utils/customerr");

const uploadRouter = async (req, res, next) => {
  const id = req.params.id;
  const imagePath = 'E:\\pdf_to_img\\images';

  try {
    // Read the image files from the output directory
    let imageFiles;
    try {
      imageFiles = fs.readdirSync(imagePath);
    } catch (error) {
      // res.status(500).json({ error: 'Error reading image files.' });
      const err = new CustomError(500, error.message);
      return next(err);
    }

    // Fetch the existing user profile data
    const existingProfile = await UserImage.findOne({ where: { user_id: id } });

    // Check if files were uploaded

    // Get the filenames of the uploaded files
    const filenames = req.files.map(file => file.filename);

    const imagesFolderPath = 'E:/pdf_to_img/images';
    const newImagePath = `${imagesFolderPath}/${filenames}`;

    const isImageExists = await fs.promises.access(newImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!isImageExists) {
      // return res.status(404).send("New image file not found in the Extracted image folder");
      const err = new CustomError(404, 'New image file not found in the Extracted image folder')
      return next(err);
    }

    // Get the image URLs
    const imageUrls = filenames.map(filename => `${req.protocol}://${req.get('host')}/images/${filename}`);

    const isDuplicateFile = await UserImage.findOne({
      where: {
        user_id: id,
        image_url: imageUrls
      }
    });

    if (isDuplicateFile) {
      // return res.status(400).send("The given file is already present in the specified user image folder");
      const err = new CustomError(404, 'The given file is already present in the specified user image folder')
      return next(err);
    }

    // Create new rows for each image
    const createdImages = await Promise.all(
      imageUrls.map(imageUrl => UserImage.create({ image_url: imageUrl, user_id: id }))
    );

    // Set response headers to indicate JSON content
    res.set('Content-Type', 'application/json');

    // Send the created images as the response
    res.status(200).json({
      statuscode: 200,
      status: 'success',
      images: { createdImages }
    });
  } catch (error) {
    console.error('Error uploading and converting PDF:', error);
    // res.status(500).json({ error: 'Internal server error.' });
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = uploadRouter;
