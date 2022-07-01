
const { models } = require('../../database/index');
const { QueryTypes, Op } = require('sequelize');
const sequelize = require('../../database/index');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        const { MAGESTIC_COINS, MAGESTIC_POINTS, TYPE, PLAYER_ID } = params;
        var insertSave = await models.PlayerTransaction.create(params);
        if (insertSave != undefined) {
            if (TYPE == "DEPOSIT") {
                await models.Player.increment(
                    {
                        PLAYER_MAGESTIC_POINTS: MAGESTIC_POINTS,
                        PLAYER_MAGESTIC_COINS: MAGESTIC_COINS
                    }, { where: { PLAYER_ID: PLAYER_ID }, return: true }
                );
                return {
                    status: true,
                    msg: "Create Successfully.",
                    data: insertSave
                }
            } else {
                var findOne = await models.Player.findOne({
                    where: {
                        PLAYER_ID: PLAYER_ID, ISACTIVE: 1, ISDELETE: 0
                    },
                    attributes: ["PLAYER_ID", "PLAYER_MAGESTIC_POINTS", "PLAYER_MAGESTIC_COINS"]
                });
                const UPDATE_PLAYER_MAGESTIC_POINTS = findOne.dataValues.PLAYER_MAGESTIC_POINTS - MAGESTIC_POINTS;
                const UPDATE_PLAYER_MAGESTIC_COINS = findOne.dataValues.PLAYER_MAGESTIC_COINS - MAGESTIC_COINS;
                if (UPDATE_PLAYER_MAGESTIC_POINTS >= 0 && UPDATE_PLAYER_MAGESTIC_COINS >= 0) { 
                    await models.Player.decrement(
                        {
                            PLAYER_MAGESTIC_POINTS: MAGESTIC_POINTS,
                            PLAYER_MAGESTIC_COINS: MAGESTIC_COINS
                        },
                        { where: { PLAYER_ID: PLAYER_ID }, return: true }
                    );
                    return {
                        status: true,
                        msg: "Create Successfully.",
                        data: insertSave
                    }
                } else {
                    return {
                        status: false,
                        msg: "You don't have sufficient balance."
                    }
                }
            }
            
        } else {
            /// 502
            return {
                status: false,
                msg: "Erron on Insert Data."
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
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { pageNumber, pageLimit } = params;
        let listQuery = await models.PlayerTransaction.findAll({
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            include: [{
                model: models.Player,
                required: true
            }],
            order: [
                ['TRANSACTION_ID', 'DESC']
            ],
        });
        let countRecords = await models.PlayerTransaction.count({});
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
async function listOneServices(params) {
    try {
        const { search } = params;
        console.log(search)
        let dataOneQuery = await models.Player.findOne({
            where: {
                [Op.or]: [
                    {
                        "PLAYER_USERNAME":
                        {
                            [Op.eq]: search
                        }
                    },
                    {
                        "PLAYER_EMAIL":
                        {
                            [Op.eq]: search
                        }
                    },
                    {
                        "PLAYER_ID": {
                            [Op.eq]: search
                        }
                    }
                ]
            }
        });
        if (dataOneQuery != null) {
            return {
                status: true,
                msg: "Show data Successfully.",
                data: dataOneQuery
            }
        } else {
            return {
                status: false,
                msg: "Data not found."
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
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function updateServices(params) {
    try {
        const { TRANSACTION_ID, PLAYER_ID, MAGESTIC_POINTS, MAGESTIC_COINS } = params;
        var updateOne = await models.PlayerTransaction.update(
            { where: { TRANSACTION_ID: TRANSACTION_ID } },
            { UPDATE_DATE: new Date(), ISREVOKE: true }
        );
        if (updateOne) {
            await models.Player.decrement(
                {
                    PLAYER_MAGESTIC_POINTS: MAGESTIC_POINTS,
                    PLAYER_MAGESTIC_COINS: MAGESTIC_COINS
                },
                { where: { PLAYER_ID: PLAYER_ID }, return: true }
            );
            return {
                status: true,
                msg: "Update data Successfully."
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


/**
 * 
 * @deprecated
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function deleteServices(params) {
    try {
        const { FAQ_ID } = params;
        var deleteOne = await models.Faq.destroy(
            { where: { FAQ_ID: FAQ_ID } }
        );
        if (deleteOne) {
            return {
                status: true,
                msg: "Delete data Successfully.",
                data: deleteOne
            }
        } else {
            return {
                status: false,
                msg: "Error on Delete data."
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
async function getServices(params) {
    try {
        const { agent } = params;
        let getData = await models.Agent.findOne({
            where: { AGENT_USERNAME: agent }
        });
        if (getData != undefined) {
            return {
                status: true,
                msg: "Get Agent Details.",
                data: getData
            }
        } else {
            /// 502
            return {
                status: false,
                msg: "Erron on Get Data."
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


module.exports = { insertServices, listServices, updateServices, deleteServices, getServices, listOneServices };