
const { models } = require('../../database/index');



/**
 * 
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function createServices(params, payload) {
    try {
        const { PLAYER_ID, GAME_ID } = payload;
        const { PLAYER_MAGESTIC_POINTS, PLAYER_MAGESTIC_COINS } = params;
        var findOne = await models.Player.findOne({
            where: {
                PLAYER_ID: PLAYER_ID, ISACTIVE: 1, ISDELETE: 0
            },
            attributes: ["PLAYER_ID", "PLAYER_MAGESTIC_POINTS", "PLAYER_MAGESTIC_COINS"]
        });
        const UPDATE_PLAYER_MAGESTIC_POINTS = findOne.dataValues.PLAYER_MAGESTIC_POINTS - PLAYER_MAGESTIC_POINTS;
        const UPDATE_PLAYER_MAGESTIC_COINS = findOne.dataValues.PLAYER_MAGESTIC_COINS - PLAYER_MAGESTIC_COINS;
        if (UPDATE_PLAYER_MAGESTIC_POINTS >= 0 && UPDATE_PLAYER_MAGESTIC_COINS >= 0) {
            console.log(UPDATE_PLAYER_MAGESTIC_POINTS , UPDATE_PLAYER_MAGESTIC_COINS)
            var updateOne = await models.Player.update(
                { PLAYER_MAGESTIC_POINTS: UPDATE_PLAYER_MAGESTIC_POINTS, PLAYER_MAGESTIC_COINS: UPDATE_PLAYER_MAGESTIC_COINS },
                { where: { PLAYER_ID: PLAYER_ID, ISACTIVE: 1, ISDELETE: 0 } });
            if (updateOne) {
                return {
                    status: true,
                    msg: "Update data Successfully.",
                    data: {
                        PLAYER_MAGESTIC_POINTS: UPDATE_PLAYER_MAGESTIC_POINTS,
                        PLAYER_MAGESTIC_COINS: UPDATE_PLAYER_MAGESTIC_COINS
                    }
                }
            } else {
                return {
                    status: false,
                    msg: "Error on Update data."
                }
            }
        } else {
            return {
                status: false,
                msg: "Please purchase any plan."
            }
        }

    } catch (error) {
        console.log(error)
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
async function updateServices(params, payload) {
    try {
        console.log(params, payload)
        const { PLAYER_ID, GAME_ID } = payload;
        const { PLAYER_MAGESTIC_POINTS, PLAYER_MAGESTIC_COINS } = params;
        var findOne = await models.Player.findOne({
            where: {
                PLAYER_ID: PLAYER_ID, ISACTIVE: 1, ISDELETE: 0
            },
            attributes: ["PLAYER_ID", "PLAYER_MAGESTIC_POINTS", "PLAYER_MAGESTIC_COINS"]
        });
        const UPDATE_PLAYER_MAGESTIC_POINTS = findOne.dataValues.PLAYER_MAGESTIC_POINTS + PLAYER_MAGESTIC_POINTS;
        const UPDATE_PLAYER_MAGESTIC_COINS = findOne.dataValues.PLAYER_MAGESTIC_COINS + PLAYER_MAGESTIC_COINS;
        var updateOne = await models.Player.update(
            { PLAYER_MAGESTIC_POINTS: UPDATE_PLAYER_MAGESTIC_POINTS, PLAYER_MAGESTIC_COINS: UPDATE_PLAYER_MAGESTIC_COINS },
            { where: { PLAYER_ID: PLAYER_ID, ISACTIVE: 1, ISDELETE: 0 } });
        if (updateOne) {
            console.log(UPDATE_PLAYER_MAGESTIC_POINTS , UPDATE_PLAYER_MAGESTIC_COINS)
            return {
                status: true,
                msg: "Update data Successfully.",
                data: {
                    PLAYER_MAGESTIC_POINTS: UPDATE_PLAYER_MAGESTIC_POINTS,
                    PLAYER_MAGESTIC_COINS: UPDATE_PLAYER_MAGESTIC_COINS
                }
            }
        } else {
            return {
                status: false,
                msg: "Error on Update data."
            }
        }
    } catch (error) {
        console.log(error)
        var errMessage = error.message.split(',\n').join('');
        return {
            status: false,
            msg: errMessage.split('Validation error: ').join('')
        }
    }

}




module.exports = { createServices, updateServices };