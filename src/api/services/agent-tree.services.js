
const { models } = require('../../database/index');
const { QueryTypes, Op } = require('sequelize');
const sequelize = require('../../database/index');


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { ROLE_ID, pageLimit, pageNumber } = params;
        let listQuery;
        if (ROLE_ID == undefined) {
            listQuery = "SELECT AGENT.AGENT_ID AS AGENT_ID , AGENT.AGENT_USERNAME AS AGENT_USERNAME, ROLES.ROLE_ID AS ROLE_ID, " +
                " ROLES.ROLE_NAME AS ROLE_NAME, ROLES.ROLE_PARENT_ID AS ROLE_PARENT_ID, AGENT.PARENT_AGENT_ID AS PARENT_AGENT_ID " +
                // " AGENT.PARENT_AGENT_IDS AS PARENT_AGENT_IDS " +
                " FROM TEST.AGENT INNER JOIN ROLES WHERE  " +
                " ROLES.ROLE_ID = AGENT.ROLE_ID  " +
                " AND AGENT.ROLE_ID = 2 " +
                " LIMIT " + parseInt(pageLimit) + " OFFSET " + parseInt(pageNumber);
        } else {
            listQuery = "SELECT AGENT.AGENT_ID AS AGENT_ID , AGENT.AGENT_USERNAME AS AGENT_USERNAME, ROLES.ROLE_ID AS ROLE_ID, " +
                " ROLES.ROLE_NAME AS ROLE_NAME, ROLES.ROLE_PARENT_ID AS ROLE_PARENT_ID, AGENT.PARENT_AGENT_ID AS PARENT_AGENT_ID " +
                // " AGENT.PARENT_AGENT_IDS AS PARENT_AGENT_IDS " +
                " FROM TEST.AGENT INNER JOIN ROLES WHERE  " +
                " ROLES.ROLE_ID = AGENT.ROLE_ID  " +
                " AND AGENT.PARENT_AGENT_ID =  " + ROLE_ID
                " LIMIT " + parseInt(pageLimit) + " OFFSET " + parseInt(pageNumber);
        }

        var listFind = await sequelize.query(listQuery, { type: QueryTypes.SELECT });
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
async function infoServices(params) {
    try {
        const { AGENT_ID } = params;
        var getAgentList = await models.Agent.findOne({
            where: { AGENT_ID: AGENT_ID }
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


module.exports = { listServices, infoServices };