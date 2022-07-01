
const { models } = require('../../database/index');
const { encryptpassword } = require('../../common/password.auth');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function updateServices(params) {
    try {
        const { AGENT_EMAIL, AGENT_PASSWORD } = params;
        var encryptPassword = await encryptpassword(AGENT_PASSWORD);

        if (encryptPassword.status) {
            await models.Agent.update(
                { AGENT_PASSWORD: encryptPassword.encrypt },
                { where: { AGENT_EMAIL: AGENT_EMAIL } }
            );
            return {
                status: true,
                msg: "Password Update Successfully."
            }

        } else {
            /// 502
            return {
                status: false,
                msg: "Please Enter Valid Password."
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

module.exports = { updateServices };