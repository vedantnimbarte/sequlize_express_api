const {  insertController, getAgentTypeController, getAgentPermissionController, 
    getGameGroupController, viewController, selectAgentTypeController, countUserNameController, selectAgentTypeAndAgentController } = require('../controller/agent.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();



/***
 * @description Table View
 */
 role.post('/list', viewController);

/***
 * @description Insert Data
 */
role.post('/', insertController);

/***
 * @description Agent Type List : First Open The model for insert ==> Ex Store, Distrubutor etc
 */
role.get('/', getAgentTypeController);


/***
 * @description Game Type --- AGENT ID pass on params : First Open The model for insert ==> Ex Game Group Name (Login User With) 
 */
 role.get('/gametypes/:id', getGameGroupController);


 /***
 * @description Check / Verify User-Name
 */
role.put('/agents', countUserNameController);


/***
 * @description Agent Permission All : Change / Select Agent Type ===> Like Create Player and so more 
 */
role.get('/:id', getAgentPermissionController);

/***
 * @description Agent Type (Role-based) With Agent : Change / Select Agent Type ==> Ex Master Distrubuter { First Role (Agent Type / Parent Type) }
 */
role.get('/agenttypes/:id', selectAgentTypeController);


/***
 * @description Any Agent : Change / Select Master Agent ==> Ex Sub-Distrubuter { Nested Role (Agent Type / Parent Type) }
 */
 role.post('/agents', selectAgentTypeAndAgentController);


module.exports = role;