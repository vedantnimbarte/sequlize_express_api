const { loginController } = require('../controller/login.controller');
var role = require('express').Router();


role.post('/', loginController);


module.exports = role;