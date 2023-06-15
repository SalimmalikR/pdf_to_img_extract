const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../utils/customerr');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      // return res.status(404).json({ message: "User not found" });
      const err = new CustomError(404, 'User not found');
      return next(err);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // return res.status(401).json({ message: "Invalid password" });
      const err = new CustomError(404, 'Invalid password');
      return next(err);
    }
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({
      statuscode: 200,
      status: 'success',
      token: { token }
    });
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    const err = new CustomError(404, error.message);
    return next(err);
  }
};

module.exports = login;
