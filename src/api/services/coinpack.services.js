
const { models } = require('../../database/index');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        var insertSave = await models.Coinpack.create(params);
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
                msg: "Erron on Insert Data."
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
        let listQuery = await models.Coinpack.findAll({
            where: { ISDELETE: false },
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            order: [
                ['PACK_ID', 'DESC']
            ]
        });
        let countRecords = await models.Coinpack.count({ where: { ISDELETE: false } });
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
        const { PACK_ID, PACK_NAME, MAGESTIC_POINTS, MAGESTIC_COINS, BUY_AMOUNT, ISOFFER, DISCOUNT } = params;
        var updateOne = await models.Coinpack.upsert(
            {
                PACK_ID: PACK_ID, PACK_NAME: PACK_NAME, MAGESTIC_POINTS: MAGESTIC_POINTS,
                MAGESTIC_COINS: MAGESTIC_COINS, BUY_AMOUNT: BUY_AMOUNT, ISOFFER: ISOFFER,
                DISCOUNT: DISCOUNT, UPDATE_DATE: new Date(), ISACTIVE: true
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
        const { PACK_ID } = params;
        var deleteOne = await models.Coinpack.update(
            { UPDATE_DATE: new Date(), ISDELETE: true },
            { where: { PACK_ID: PACK_ID } }
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


/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function comboServices(params) {
    try {
        let listQuery = await models.Coinpack.findAll({
            ISDELETE: false
        });

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


module.exports = { insertServices, listServices, updateServices, deleteServices, comboServices };