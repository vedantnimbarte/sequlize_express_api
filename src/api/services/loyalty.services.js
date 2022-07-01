
const { models } = require('../../database/index');
const { QueryTypes, Op } = require("sequelize");
const sequelize = require('../../database/index');
/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        let listQuery = await models.Loyalty.findAll({
            where: { ISDELETE: false }
        });
        var listData = listQuery.map(data => data.LOYALTY_END_POINTS);
        var maxValue = 0;
        if (listData.length > 0) {
            maxValue = listData.sort((a, b) => b - a)[0];
        }
        const { LOYALTY_START_POINTS, LOYALTY_END_POINTS } = params;
        if (LOYALTY_START_POINTS > maxValue && LOYALTY_END_POINTS > maxValue) {
            var insertSave = await models.Loyalty.create(params);
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
                    msg: "Error on Insert Data."
                }
            }
        } else {
            return {
                status: false,
                msg: "Please Insert Loyalty Points greater than Pervious Loyalty End Points."
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
async function listServices(params) {
    try {
        const { pageNumber, pageLimit } = params;
        let listQuery = await models.Loyalty.findAll({
            where: { ISDELETE: false },
            offset: pageNumber * pageLimit,
            limit: pageLimit
        });
        let countRecords = await models.Loyalty.count({ where: { ISDELETE: false } });
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
        const { LOYALTY_ID, LOYALTY_NAME, LOYALTY_MULTIPLIER, LOYALTY_START_POINTS, LOYALTY_END_POINTS } = params;
        // let listQuery = await models.Loyalty.findAll({
        //     where: { ISDELETE: false, LOYALTY_ID: { [Op.gt]: LOYALTY_ID } }
        // });
        // var listData = listQuery.map(data => data.LOYALTY_END_POINTS);
        // var maxValue = 0;
        // if (listData.length > 0) {
        //     maxValue = listData.sort((a, b) => b - a)[0];
        // }
        var updateOne = await models.Loyalty.upsert(
            {
                LOYALTY_ID: LOYALTY_ID, LOYALTY_NAME: LOYALTY_NAME, LOYALTY_START_POINTS: LOYALTY_START_POINTS,
                LOYALTY_END_POINTS: LOYALTY_END_POINTS, LOYALTY_MULTIPLIER: LOYALTY_MULTIPLIER,
                UPDATE_DATE: new Date(), ISACTIVE: true
            }
        );
        if (updateOne) {
            return {
                status: true,
                msg: "Update data Successfully.",
                data: updateOne[0]
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
 * @description Date - 29-12-2021 
 * @author Dipesh
 * 
 */
async function deleteServices(params) {
    try {
        const { LOYALTY_ID } = params;
        var deleteOne = await models.Loyalty.update(
            { UPDATE_DATE: new Date(), ISDELETE: true },
            { where: { LOYALTY_ID: LOYALTY_ID } }
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


module.exports = { insertServices, listServices, updateServices, deleteServices };