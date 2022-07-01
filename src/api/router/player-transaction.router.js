const { viewController, insertController, updateController, deleteController, getController, getOneController } = require('../controller/player-transaction.controller');
const { verifyAccessToken } = require('../middleware/auth.middleware');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();

role.post('/', insertController);

role.post('/list', viewController);

role.post('/getplayer', getOneController);

role.put('/:id', updateController);

role.put('/', deleteController);

role.post('/getagent', getController);

module.exports = role;