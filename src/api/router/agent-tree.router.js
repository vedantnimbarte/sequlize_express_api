const { viewController, infoController } = require('../controller/agent-tree.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


role.post('/list', viewController);



role.post('/', infoController);

module.exports = role;