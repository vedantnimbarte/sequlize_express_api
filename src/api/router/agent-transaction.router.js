const { viewController, insertController, updateController, deleteController, getController } = require('../controller/agent-transaction.controller');
const { verifyAccessToken } = require('../middleware/auth.middleware');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.post('/', insertController);


role.post('/list', viewController);


role.put('/:id', updateController);


role.put('/', deleteController);


role.post('/getagent', verifyAccessToken, getController);


module.exports = role;