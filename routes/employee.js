const express = require('express');
const router = express.Router();
const path = require('path');

const employeeDB = require('../data/employee.json')

router.get('/', (req, res) =>{
    res.json(employeeDB);
});
router.get('/:id', (req, res) =>{
    res.json(employeeDB[req.params.id - 1]);
});

module.exports = router