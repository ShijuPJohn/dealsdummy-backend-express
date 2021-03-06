const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({path: './config.env'});
module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({msg: 'Token is not valid'});
    }

}