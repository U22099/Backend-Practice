const express = require('express');
const app = express();
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const corsOption = {
    origin: (origin, callback) => {
        if(origin === 'http://localhost:8090' || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed By CORS'));
        }
    },
    optionsSuccessfulStatus: 200
}
const cors = require('cors');
const cookieParser = require('cookie-parser')
const logEvent = require('./middleware/logsEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{}
const myEmitter = new Emitter();
myEmitter.on('logs', (msg) => logEvent(msg));

const PORT = process.env.PORT || 8090;

app.use(credentials)
app.use(cors(corsOption));

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.path}`);
    myEmitter.emit('logs',`${req.method}\t${req.headers.origin}\t${req.url}`);
    next()
})
app.use(express.urlencoded({ extended: false}));

app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));

app.use(verifyJWT);

app.use('/home', require('./routes/home'));
app.use('/employee', require('./routes/employee'));

app.use((err, req, res, next) => {
    console.log(`${err.stack}`);
    res.status(500).send(`${err.message}`);
    myEmitter.emit('logs', `${err.name}\t${err.message}`);
})
app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));