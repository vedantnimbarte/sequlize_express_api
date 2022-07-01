const { viewController, updateController } = require('../controller/agent-permission.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.put('/:id',  updateController);


role.post('/list', viewController);

module.exports = role;