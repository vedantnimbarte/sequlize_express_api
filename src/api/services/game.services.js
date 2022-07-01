
const { models } = require('../../database/index');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        var insertSave = await models.Game.create(params);
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
        let listQuery = await models.Game.findAll({
            where: { ISDELETE: false },
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            order: [
                ['GAME_ID', 'DESC']
            ],
        });
        let countRecords = await models.Game.count({});
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
        const { ISFILE } = params;
        var updateOne;
        if (ISFILE) {
            const { GAME_ID, GAME_NAME, GAME_URL, GAME_IMAGE, DESCRIPTION, GAMEGROUP_ID } = params;
            updateOne = await models.Game.upsert(
                { GAME_ID: GAME_ID, GAME_NAME: GAME_NAME, GAME_URL: GAME_URL, GAME_IMAGE: GAME_IMAGE, DESCRIPTION: DESCRIPTION, GAMEGROUP_ID: GAMEGROUP_ID, UPDATE_DATE: new Date(), ISACTIVE: true }
            );
        } else {
            const { GAME_ID, GAME_NAME, GAME_URL, DESCRIPTION, GAMEGROUP_ID } = params;
            updateOne = await models.Game.upsert(
                { GAME_ID: GAME_ID, GAME_NAME: GAME_NAME, GAME_URL: GAME_URL, GAMEGROUP_ID: GAMEGROUP_ID, DESCRIPTION: DESCRIPTION, UPDATE_DATE: new Date(), ISACTIVE: true }
            );
        }
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
        const { GAME_ID } = params;
        var deleteOne = await models.Game.update(
            { UPDATE_DATE: new Date(), ISDELETE: true },
            { where: { GAME_ID: GAME_ID } }
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