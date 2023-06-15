const User = require('../model/user');
const UserImage = require('../model/userprofile');
const CustomError = require('../utils/customerr');

// Query to fetch user data from both tables
const fetchUserData = async (req, res, next) => {
    const id = req.id;
    try {
        // Fetch user image data from the UserImage table
        const userImages = await UserImage.findAll();

        // Combine the user data and user image data
        const userData = {
            userimages: userImages,
        };

        res.status(200).json({
            statuscode: 200,
            status: 'success',
            userdata: { userData }
        });
    } catch (error) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

module.exports = fetchUserData;
