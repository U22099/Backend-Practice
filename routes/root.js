const express = require('express');
const router = express.Router();
const path = require('path');

const logEvent = require('../middleware/logsEvent');
const EventEmitter = require('events');
class Emitter extends EventEmitter{}
const myEmitter = new Emitter();
myEmitter.on('logs', (msg) => logEvent(msg));

router.get('^/$|logIn(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'view', 'logIn.html'));
    myEmitter.emit('logs', 'HTML CALLED');
});

router.get('*.html', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'view', req.url));
    myEmitter.emit('logs', 'HTML CALLED');
});

router.get('*.css', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'style', req.url));
    myEmitter.emit('logs', 'CSS CALLED');
});

router.get('*.js', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'script', req.url));
    myEmitter.emit('logs', 'JAVASCRIPT CALLED');
});

module.exports = router;