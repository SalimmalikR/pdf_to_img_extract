const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customerr');

function verifyToken(req, res, next) {
    const token = req.header('jwt');

    if (!token) {
        const err = new CustomError(404,'Invalid token')
        return next(err);
    }
    try {
        const user = jwt.verify(token, 'secretkey')
        req.id = user.id;
        next();
    } catch (error) {
        const err = new CustomError(500,error.message);
        return next(err);
    }
}

module.exports = verifyToken;