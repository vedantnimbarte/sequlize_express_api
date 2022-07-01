const { encryptpassword } = require('../../common/password.auth');
const { insertServices, getAgentTypeServices, getAgentPermissionServices, getGameGroupServices, 
    listServices, selectAgentTypeServices, countUserNameServices, selectAgentTypeAndAgentHelperServices } = require('../services/agent.services');

/***
 * 
 * @description Role Help For Request
 * 
 */
async function insertHelper(params) {
    try {
        var encryptPassword = await encryptpassword(params.PASSWORD);
        if (encryptPassword.status) {
            params.PASSWORD = encryptPassword.encrypt;
            var insertService = await insertServices(params);
            return insertService;
        } else {
            return encryptPassword;
        }
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
async function getAgentTypeHelper(params) {
    try {
        var getAgentTypeService = await getAgentTypeServices(params);
        return getAgentTypeService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
async function getAgentPermissionHelper(params) {
    try {
        var getAgentPermissionService = await getAgentPermissionServices(params);
        return getAgentPermissionService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Request
 * 
 */
async function getGameGroupHelper(params) {
    try {
        var getGameService = await getGameGroupServices(params);
        return getGameService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

/***
 * 
 * @description Role Help For Pagination
 * 
 */
async function viewHelper(params) {
    try {
        var listService = await listServices(params);
        return listService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}



/***
 * 
 * @description Role Help For Pagination
 * 
 */
 async function selectAgentTypeHelper(params) {
    try {
        var selectAgentTypeService = await selectAgentTypeServices(params);
        return selectAgentTypeService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}



/***
 * 
 * @description Role Help For Pagination
 * 
 */
 async function countUserNameHelper(params) {
    try {
        var countUserNameService = await countUserNameServices(params);
        return countUserNameService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

/***
 * 
 * @description Role Help For Pagination
 * 
 */
 async function selectAgentTypeAndAgentHelper(params) {
    try {
        var selectAgentTypeAndAgentHelperService = await selectAgentTypeAndAgentHelperServices(params);
        return selectAgentTypeAndAgentHelperService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

module.exports = { insertHelper, getAgentTypeHelper, getAgentPermissionHelper, getGameGroupHelper, viewHelper, selectAgentTypeHelper, countUserNameHelper, selectAgentTypeAndAgentHelper };