
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
        const { MAGESTIC_POINTS, MAGESTIC_COINS, AGENT_ID } = params;
        var insertSave = await models.AgentTransaction.create(params);
        if (insertSave != undefined) {
            await models.Agent.increment(
                {
                    CURRENT_MAGESTIC_POINTS: MAGESTIC_POINTS,
                    CURRENT_MAGESTIC_COINS: MAGESTIC_COINS
                }, { where: { AGENT_ID: AGENT_ID }, return: true }
            );
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
        let listQuery = await models.AgentTransaction.findAll({
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            include: [{
                model: models.Agent,
                required: true
            }],
            order: [
                ['TRANSACTION_ID', 'DESC']
            ],
        });
        let countRecords = await models.AgentTransaction.count({});
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
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function updateServices(params) {
    try {
        const { TRANSACTION_ID, AGENT_ID, MAGESTIC_POINTS, MAGESTIC_COINS } = params;
        var updateOne = await models.AgentTransaction.update(
            { where: { TRANSACTION_ID: TRANSACTION_ID } },
            { UPDATE_DATE: new Date(), ISREVOKE: true }
        );
        if (updateOne) {
            await models.Agent.increment(
                {
                    CURRENT_MAGESTIC_POINTS: MAGESTIC_POINTS,
                    CURRENT_MAGESTIC_COINS: MAGESTIC_COINS
                }, { where: { AGENT_ID: AGENT_ID }, return: true }
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
        const { search } = params;
        let getData = await models.Agent.findOne({
            where: {
                [Op.or]: [
                    {
                        "AGENT_USERNAME":
                        {
                            [Op.eq]: search
                        }
                    },
                    {
                        "AGENT_EMAIL":
                        {
                            [Op.eq]: search
                        }
                    },
                    {
                        "AGENT_ID": {
                            [Op.eq]: search
                        }
                    }
                ]
            }
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


module.exports = { insertServices, listServices, updateServices, deleteServices, getServices };