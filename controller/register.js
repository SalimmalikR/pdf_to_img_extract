const User = require('../model/user');
const Userimage = require('../model/userprofile');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customerr');

const register = async (req, res, next) => {
  try {
    const { password, ...userFields } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...userFields,
      password: hashedPassword
    });

    res.status(200).json({
      statuscode: 200,
      status: 'success',
      message: "Successfully created"
    });
  } catch (error) {
    // res.status(500).json({ message: err.message });
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = register;
