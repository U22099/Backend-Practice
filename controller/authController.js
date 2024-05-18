const jwt = require('jsonwebtoken');
require('dotenv').config()
const usersDB = {
    users: require('../data/users.json'),
    setUsers: (data) => usersDB.users = data
}
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt')
const path = require('path');


const handleLogin = async (req, res) => {
    const { input, pwd} = req.body;

    if(!input || !pwd) return res.status(403).json({'message': 'Username Or Email and Password is required'});

    const foundUser = usersDB.users.find(x => x.username === input || x.email === input);
    if(!foundUser) return res.sendStatus(401)

    const match = await bcrypt.compare(pwd, foundUser.pwd);
    if(match){
        const accessToken = jwt.sign(
            {'username' : foundUser.username}, 
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn : '2m'}
        );
        const refreshToken = jwt.sign(
            {'username' : foundUser.username}, 
            process.env.REFRESH_TOKEN_SECRET, 
            {expiresIn : '1d'}
        );

        const currentUserData = {...foundUser, refreshToken}
        const otherUser = usersDB.users.filter(x => x.username !== foundUser.username);
        usersDB.setUsers([currentUserData, ...otherUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 1000});
        res.sendStatus(200);
    } else {
        res.status(401).json({'message' : 'Incorrect Password'})
    }
}

module.exports = {handleLogin}