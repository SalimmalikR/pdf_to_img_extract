const User = require('../model/user');
const UserImage = require('../model/userprofile');
const CustomError = require('../utils/customerr');

// Query to fetch user data from both tables
const fetchUserData = async (req, res, next) => {
  const id = req.id;
  try {
    // Fetch user data from the User table
    const user = await User.findByPk(id);

    // Fetch user image data from the UserImage table
    const userImages = await UserImage.findAll({ where: { user_id: id } });

    // Combine the user data and user image data
    const userData = {
      userimages: userImages,
    };

    res.status(200).json({
      statuscode: 200,
      status: "success",
      userData: { userData }
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = fetchUserData;
