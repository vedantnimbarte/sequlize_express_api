const { viewController, insertController, updateController, deleteController, fileupdateController } = require('../controller/slider.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.post('/', insertController);


role.post('/list', viewController);


role.put('/:id',  updateController);


role.put('/file/:id', fileupdateController);


role.put('/', deleteController);

module.exports = role;