const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controller/registerController')
const logEvent = require('../middleware/logsEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{}
const myEmitter = new Emitter();
myEmitter.on('logs', (msg) => logEvent(msg));

router.post('/', registerController.handleNewUser);

module.exports = router;