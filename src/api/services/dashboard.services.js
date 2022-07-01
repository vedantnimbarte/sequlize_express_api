
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
        let countAgents = await models.Agent.count({ where: { ISDELETE: false } });
        let countTotalPlayer = await models.Player.count({ where: { ISDELETE: false } });
        let countActivePlayer = await models.Player.count({ where: { ISDELETE: false, ISACTIVE: true } });
        return {
            status: true,
            msg: "Show data Successfully.",
            countNetwork: countAgents,
            countTotalplayer: countTotalPlayer,
            countActiveplayer: countActivePlayer
        }
    } catch (error) {
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}



module.exports = { listServices };