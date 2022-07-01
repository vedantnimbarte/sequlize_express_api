
const { models } = require('../../database/index');

/***
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By 
 * 
 */
async function insertServices(params) {
    try {
        var insertSave = await models.Player.create(params);
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
        let listQuery = await models.Player.findAll({
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            order: [
                ['PLAYER_ID', 'DESC']
            ],
        });
        let countRecords = await models.Player.count({});
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
        // PLAYER_ID, 
        // PLAYER_USERNAME, PLAYER_NAME, PLAYER_EMAIL, PLAYER_PHONE, PASSWORD, 
        // ISACTIVE, ISDELETE, CREATE_DATE, UPDATE_DATE, LOGIN_DATE, AGENT_ID, PARENT_AGENT_ID
        const { PLAYER_ID, PLAYER_USERNAME, PLAYER_NAME, PLAYER_EMAIL, PLAYER_PHONE, PASSWORD, AGENT_ID } = params;
        var updateOne = await models.Player.update(
            {
                PLAYER_USERNAME: PLAYER_USERNAME, PLAYER_NAME: PLAYER_NAME, PLAYER_EMAIL: PLAYER_EMAIL,
                PLAYER_PHONE: PLAYER_PHONE, PASSWORD: PASSWORD,
                AGENT_ID: AGENT_ID,
                UPDATE_DATE: new Date(), ISACTIVE: true
            },
            { where: { PLAYER_ID: PLAYER_ID } }
        );
        if (updateOne) {
            updateOne = await models.Player.findOne({
                where: { PLAYER_ID: PLAYER_ID }
            });
            return {
                status: true,
                msg: "Update data Successfully.",
                data: updateOne
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
        const { PLAYER_ID, ISACTIVE } = params;
        var deleteOne = await models.Player.update(
            { UPDATE_DATE: new Date(), ISACTIVE: ISACTIVE },
            { where: { PLAYER_ID: PLAYER_ID } }
        );
        if (deleteOne) {
            deleteOne = await models.Player.findOne({
                where: { PLAYER_ID: PLAYER_ID }
            });
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