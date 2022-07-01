
const { models } = require('../../database/index');
const { QueryTypes, Op } = require("sequelize");
const sequelize = require('../../database/index');
const { comparepassword } = require('../../common/password.auth');
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
} = require('./../middleware/auth.middleware');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function loginServices(params) {
    try {
        const { AGENT_EMAIL, AGENT_PASSWORD } = params;
        var getOne = await models.Agent.findOne({
            where: {
                AGENT_EMAIL: AGENT_EMAIL
            },
            attributes: ["ROLE_ID", "AGENT_EMAIL", "AGENT_USERNAME", "AGENT_ID", "AGENT_PERMISSION_IDS", "PASSWORD"]
        });
        if (getOne != undefined) {
            var comparePassword = await comparepassword({ password: AGENT_PASSWORD, dbPassword: getOne.dataValues.PASSWORD });
            if (!comparePassword) {
                var getAgentPermisisons = null;
                if (getOne.dataValues.AGENT_PERMISSION_IDS !== null) {
                    getAgentPermisisons = await models.AgentPermission.findAll({
                        where: { AGENT_PERMISSION_ID: { [Op.in]: getOne.dataValues.AGENT_PERMISSION_IDS.split(',').map(data => parseInt(data)) } },
                        attributes: ["AGENT_PERMISSION_KEY"]
                    });
                }
                var menuPermisisons = "SELECT MENU.MENU_NAME AS MENU_NAME, MENU.MENU_SLUG AS MENU_SLUG,  " +
                    " MENUPERMISSION.ISVIEW AS ISVIEW, MENUPERMISSION.ISUPDATE AS ISUPDATE,  " +
                    " MENUPERMISSION.ISNEW AS ISNEW, MENUPERMISSION.ISDELETE AS ISDELETE " +
                    " FROM MENU INNER JOIN MENUPERMISSION  " +
                    " WHERE MENU.MENU_ID = MENUPERMISSION.MENU_ID  " +
                    " AND MENUPERMISSION.ROLE_ID = " + parseInt(getOne.dataValues.ROLE_ID);
                var menuPermisison = await sequelize.query(menuPermisisons, { type: QueryTypes.SELECT });
                const accessToken = await signAccessToken(JSON.stringify({
                    "ROLE_ID": getOne.dataValues.ROLE_ID,
                    "AGENT_EMAIL": getOne.dataValues.AGENT_EMAIL,
                    "AGENT_USERNAME": getOne.dataValues.AGENT_USERNAME,
                    "AGENT_ID": getOne.dataValues.AGENT_ID
                }));
                const refreshToken = await signRefreshToken(JSON.stringify({
                    "ROLE_ID": getOne.dataValues.ROLE_ID,
                    "AGENT_EMAIL": getOne.dataValues.AGENT_EMAIL,
                    "AGENT_USERNAME": getOne.dataValues.AGENT_USERNAME,
                    "AGENT_ID": getOne.dataValues.AGENT_ID
                }));
                if(accessToken != null && refreshToken != null) {
                    return {
                        status: true,
                        msg: "Login Successfully.",
                        data: {
                            userdata: {
                                "ROLE_ID": getOne.dataValues.ROLE_ID,
                                "AGENT_EMAIL": getOne.dataValues.AGENT_EMAIL,
                                "AGENT_USERNAME": getOne.dataValues.AGENT_USERNAME,
                                "AGENT_ID": getOne.dataValues.AGENT_ID
                            },
                            agentpermission: getAgentPermisisons,
                            menupermission: menuPermisison,
                            accessToken : accessToken,
                            refreshToken : refreshToken
                        }
                    }
                } else {
                    return {
                        status: false,
                        msg: "Login Successfully."
                    }
                }
            } else {
                return {
                    status: false,
                    msg: "Your Password is invalid. Please Try Again."
                }
            }
        } else {
            /// 502
            return {
                status: false,
                msg: "Please Enter Valid Email."
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



module.exports = { loginServices };