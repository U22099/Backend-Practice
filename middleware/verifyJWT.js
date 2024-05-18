const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token){
        return res.redirect('/refresh')
    };
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({'message': 'Wrong Token'});
            req.username = decoded.username;
            next()
        }
    );
}

module.exports = verifyJWT;