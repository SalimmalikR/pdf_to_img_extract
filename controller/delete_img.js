const UserImage = require('../model/userprofile');
const CustomError = require('../utils/customerr');

const delete_img = async (req, res, next) => {
    const id = req.params.id
    const oldFile = req.params.imageName;
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/images/`;
        const imageUrl = `${baseUrl}${oldFile}`;

        const existingImage = await UserImage.findOne({
            where: {
                user_id: id,
                image_url: imageUrl
            }
        })
        if (!existingImage) {
            //    return res.status(404).json({message:"Image not found for the specified user"})
            const err = new CustomError(404, 'Image not found for the specified user');
            return next(err);
        }
        await existingImage.destroy()

        res.status(200).json({
            statuscode: 200,
            status: 'success',
            message: 'Image deleted successfully.'
        });
    } catch (error) {
        // res.status(500).json({ message: err.message });
        const err = new CustomError(500, error.message);
        return next(err);
    }
}

module.exports = delete_img;