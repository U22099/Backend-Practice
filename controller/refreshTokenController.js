const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleRefreshToken = (req, res) => {
    const usersDB = {
        users: require('../data/users.json')
    }
    const refreshToken = req.cookies.jwt;
    if(!refreshToken) return res.status(401).redirect('/');
    const index = usersDB.users.findIndex(x => x.refreshToken === refreshToken)
    const user = usersDB.users[index]

    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || (user.username !== decoded.username)) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {'username': user.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '2m'}
            );
            res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 1000});
            res.status(200).redirect('/home')
        }
    )
}

module.exports = {handleRefreshToken};