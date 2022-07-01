var { createController, updateController } = require('./../controller/bet.controller');
var { verifyAccessToken } = require('./../middleware/auth.middleware');
var express = require('express');
var router = express.Router();
/// Create Controller
router.post('/', verifyAccessToken, createController);
/// Update Controller
router.put('/', verifyAccessToken, updateController);
module.exports = router;