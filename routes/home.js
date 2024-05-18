const express = require('express');
const router = express.Router();
const path = require('path');

const logEvent = require('../middleware/logsEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{}
const myEmitter = new Emitter();
myEmitter.on('logs', (msg) => logEvent(msg));

router.get('^/$|homepage(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'view', 'homepage.html'));
    myEmitter.emit('logs', 'Homepage CALLED');
});

module.exports = router;