
const { models } = require('../../database/index');

/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { PAGETITLE, SLUG_URL } = params;
        let listQuery = await models.Setting.findOne({ where: { PAGETITLE: PAGETITLE } });
        if (listQuery != undefined) {
            return {
                status: true,
                msg: "Show data Successfully.",
                data: listQuery
            }
        } else {
            listQuery = await models.Setting.create({ PAGETITLE: PAGETITLE, TITLE: PAGETITLE, DESCRIPTION: "", SLUG_URL: SLUG_URL });
            return {
                status: true,
                msg: "Show data Successfully.",
                data: listQuery
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
        const { SETTING_ID, PAGETITLE, TITLE, DESCRIPTION, SLUG_URL } = params;
        var updateOne = await models.Setting.upsert(
            { SETTING_ID: SETTING_ID, PAGETITLE: PAGETITLE, TITLE: TITLE, DESCRIPTION: DESCRIPTION, SLUG_URL: SLUG_URL, UPDATE_DATE: new Date() }
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



module.exports = { listServices, updateServices };