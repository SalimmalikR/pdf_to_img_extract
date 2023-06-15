const users = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const CustomError = require('../utils/customerr')

const admin_login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const admin = await users.findOne({ where: { email: email } })
        if (!admin) {
            const err = new CustomError(400, 'Invalid user')
            return next(err);
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid) {
            const err = new CustomError(400, 'Invalid password')
            return next(err);
        }
        const token = jwt.sign({ id: admin.id }, 'adminkey', { expiresIn: '1h' });
        res.status(200).json({
            statuscode: 200,
            status: 'success',
            token: { token }
        });

    } catch (error) {
        const err = new CustomError(500, error.message)
        return next(err);
    }
}

module.exports = admin_login