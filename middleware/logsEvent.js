const fs = require('fs'); 
const fsPromises = require('fs').promises;
const path = require('path');
const {v4: uuid} = require('uuid');
const {format} = require('date-fns');

const logEvent = async (msg) => {
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'Logs.txt'), `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}\t${uuid()}\t${msg}\n`)
    } catch (error) {
        console.log(error);
    }
}

module.exports =  logEvent ;