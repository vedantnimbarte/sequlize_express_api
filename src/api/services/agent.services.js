
const { models } = require('../../database/index');
const { Op } = require("sequelize");
/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        if (params.PARENT_AGENT_ID == 0) {
            params.PARENT_AGENT_ID = 1;
        }
        var insertSave = await models.Agent.create(params);
        if (insertSave != undefined) {
            return {
                status: true,
                msg: "Create Successfully.",
                data: insertSave
            }
        } else {
            /// 502
            return {
                status: false,
                msg: "Erron on Insert Data."
            }
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function getAgentTypeServices(params) {
    try {
        var listFind = await models.Roles.findAll({
            where: { ISDELETE: false, ROLE_ID: { [Op.ne]: 1 } }, /// ROLE_ID: { [Op.ne] : 1 }
            attributes: ['ROLE_NAME', 'ROLE_ID', 'ROLE_PARENT_ID']
        });
        return {
            status: true,
            msg: "Show data Successfully.",
            data: listFind
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function getAgentPermissionServices(params) {
    try {
        const { ROLE_ID } = params;
        var listFind = await models.AgentPermission.findAll({
            where: { ISVIEW: true, ROLE_ID: ROLE_ID },
            attributes: ['AGENT_PERMISSION_ID', 'AGENT_PERMISSION_VALUE']
        });
        return {
            status: true,
            msg: "Show data Successfully.",
            data: listFind
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function getGameGroupServices(params) {
    try {
        var listFind = await models.GameGroup.findAll({
            where: { ISDELETE: false },
            attributes: ['GAMEGROUP_ID', 'GAMEGROUP_NAME']
        });
        return {
            status: true,
            msg: "Show data Successfully.",
            data: listFind
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { pageNumber, pageLimit, ISACTIVE } = params;
        let listQuery = await models.Agent.findAll({
            where: { ISACTIVE: ISACTIVE },
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            order: [
                ['AGENT_ID', 'DESC']
            ],
        });
        let countRecords = await models.Agent.count({});
        return {
            status: true,
            msg: "Show data Successfully.",
            total: countRecords,
            data: listQuery
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}

/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
*/
async function selectAgentTypeServices(params) {
    try {
        const { ROLE_ID } = params;
        var getAgentList = await models.Agent.findAll({
            where: { ISACTIVE: true, ROLE_ID: ROLE_ID },
            order: [
                ['AGENT_ID', 'DESC']
            ],
            attributes: ['AGENT_ID', 'AGENT_USERNAME', 'ROLE_ID']
        });
        return {
            status: true,
            msg: "Show data Successfully.",
            data: getAgentList
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
*/
async function countUserNameServices(params) {
    try {
        const { AGENT_USERNAME } = params;
        var getAgentList = await models.Agent.count({
            where: { AGENT_USERNAME: AGENT_USERNAME },
            attributes: ['AGENT_USERNAME']
        });
        if (getAgentList == 0) {
            return {
                status: true,
                msg: "User-name is present."
            }
        } else {
            return {
                status: false,
                msg: "Please Try Another User-Name"
            }
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
*/
async function selectAgentTypeAndAgentHelperServices(params) {
    try {
        const { ROLE_ID, AGENT_ID } = params;
        var getAgentList = await models.Agent.findAll({
            where: { ROLE_ID: ROLE_ID, PARENT_AGENT_ID: AGENT_ID, ISACTIVE: 1, ISBLOCK: 0, ISDELETE: 0 },
            attributes: ['AGENT_USERNAME', 'AGENT_ID']
        });
        return {
            status: true,
            msg: "User-name is present.",
            data: getAgentList
        }
        

    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }
}

module.exports = {
    insertServices, getAgentTypeServices, getAgentPermissionServices, getGameGroupServices,
    listServices, selectAgentTypeServices, countUserNameServices, selectAgentTypeAndAgentHelperServices
};