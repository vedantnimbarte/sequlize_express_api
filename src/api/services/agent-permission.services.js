
const { models } = require('../../database/index');

/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { ROLE_ID } = params;
        let listQuery = await models.AgentPermission.findAll({ where: { ROLE_ID: ROLE_ID } });
        return {
            status: true,
            msg: "Show data Successfully.",
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
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function updateServices(params) {
    try {
        const { AGENT_PERMISSION_ID, ISVIEW } = params;
        var updateOne = await models.AgentPermission.update(
            { ISVIEW: ISVIEW, UPDATE_DATE: new Date() },
            { where: { AGENT_PERMISSION_ID: AGENT_PERMISSION_ID } }
        );
        if (updateOne) {
            return {
                status: true,
                msg: "Update data Successfully.",
                data: updateOne
            }

        } else {
            return {
                status: false,
                msg: "Error on Update data."
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



module.exports = { listServices, updateServices };