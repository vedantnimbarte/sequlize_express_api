const { viewController, updateController, getController } = require('../controller/menu-permission.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.put('/:id',  updateController);


role.post('/list', viewController);


role.put('/',  getController);

module.exports = role;