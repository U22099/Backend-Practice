const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data){ this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {username, email, pwd} = req.body;
    if(!username || !email || !pwd) return res.status(401).json({"message": "Username, Email and Password must be provided"});

    if(usersDB.users.find(user => user.username === username)) return res.status(401).json({"message": 'Username Already Exists'})

    try {
        const hashedpwd = await bcrypt.hash(pwd, 10);

        const newUser = {
            'username': username,
            'email': email,
            'pwd': hashedpwd
        }

        usersDB.users.push(newUser);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.status(201).json({'message': 'User created successfully!!'})
    } catch (error) {
        console.log(error);        
        res.status(500).json({'message' : error.message})
    }
}

module.exports = {handleNewUser};