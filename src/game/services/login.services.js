
const { models } = require('../../database/index');
const { comparepassword } = require('../../common/password.auth');
const {
    signAccessToken,
    signRefreshToken
} = require('./../middleware/auth.middleware');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function loginServices(params) {
    try {
        const { PLAYER_EMAIL, PASSWORD, GAME_NAME } = params;
        var getOne = await models.Player.findOne({
            where: {
                PLAYER_EMAIL: PLAYER_EMAIL,
                ISACTIVE: 1,
                ISDELETE: 0
            },
            attributes: ["PLAYER_ID", "PLAYER_USERNAME", "PLAYER_NAME", "PLAYER_EMAIL", "PLAYER_PHONE", "PLAYER_MAGESTIC_POINTS", "PLAYER_MAGESTIC_COINS", "AGENT_ID", "PASSWORD"]
        });
        if (getOne != undefined) {
            var comparePassword = await comparepassword({ password: PASSWORD, dbPassword: getOne.dataValues.PASSWORD });
            if (comparePassword) {
                var gameId = await models.Game.findOne({
                    where: {
                        GAME_NAME: GAME_NAME,
                        ISACTIVE: 1,
                        ISDELETE: 0
                    },
                    attributes: [ "GAME_ID" ]
                })
                const accessToken = await signAccessToken(JSON.stringify({
                    "PLAYER_ID": getOne.dataValues.PLAYER_ID,
                    "GAME_ID": gameId.dataValues.GAME_ID
                }))
                const refreshToken = await signRefreshToken(JSON.stringify({
                    "PLAYER_ID": getOne.dataValues.PLAYER_ID,
                    "GAME_ID": gameId.dataValues.GAME_ID
                }))
                return {
                    status: true,
                    msg: "Login Successfully.",
                    data: {
                        PLAYER_ID: getOne.dataValues.PLAYER_ID,
                        PLAYER_USERNAME: getOne.dataValues.PLAYER_USERNAME,
                        PLAYER_NAME: getOne.dataValues.PLAYER_NAME,
                        PLAYER_EMAIL: getOne.dataValues.PLAYER_EMAIL,
                        PLAYER_PHONE: getOne.dataValues.PLAYER_PHONE,
                        PLAYER_MAGESTIC_POINTS: getOne.dataValues.PLAYER_MAGESTIC_POINTS,
                        PLAYER_MAGESTIC_COINS: getOne.dataValues.PLAYER_MAGESTIC_COINS,
                        AGENT_ID: getOne.dataValues.AGENT_ID,
                        REFRESH_TOKEN_SECRET: refreshToken,
                        ACCESS_TOKEN_SECRET: accessToken
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