const { viewController, insertController, updateController, deleteController, comboController } = require('../controller/coinpack.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.post('/', insertController);


role.post('/list', viewController);


role.get('/', comboController);


role.put('/:id',  updateController);


role.put('/', deleteController);

module.exports = role;