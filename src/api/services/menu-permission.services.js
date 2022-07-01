
const { models } = require('../../database/index');
const { QueryTypes, Op } = require("sequelize");
const sequelize = require('../../database/index');
/**
 * 
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function listServices(params) {
    try {
        const { ROLE_ID, pageNumber, pageLimit } = params;
        let listQuery = await models.MenuPermission.findAll({
            where: { ROLE_ID: ROLE_ID },
            offset: pageNumber * pageLimit,
            limit: pageLimit,
            include: [{
                model: models.Menu,
                attributes: ["MENU_NAME"],
                required: true
            }],
            attributes:
                [["MENU_PERMISSION_ID", "MENU_PERMISSION_ID"],
                ["ISVIEW", "ISVIEW"],
                ["ISUPDATE", "ISUPDATE"],
                ["ISNEW", "ISNEW"],
                ["ISDELETE", "ISDELETE"],
                ["MENU_ID", "MENU_ID"]]
        });
        let countRecords = await models.MenuPermission.count({ where: { ROLE_ID: ROLE_ID } });
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
        const { MENU_PERMISSION_ID, KEY } = params;
        var updateOne;
        if (KEY == "NEW") {
            const { ISNEW } = params;
            updateOne = await models.MenuPermission.update(
                { ISNEW: ISNEW, UPDATE_DATE: new Date() },
                { where: { MENU_PERMISSION_ID: MENU_PERMISSION_ID } }
            );
        } else if (KEY == "UPDATE") {
            const { ISUPDATE } = params;
            updateOne = await models.MenuPermission.update(
                { ISUPDATE: ISUPDATE, UPDATE_DATE: new Date() },
                { where: { MENU_PERMISSION_ID: MENU_PERMISSION_ID } }
            );
        } else if (KEY == "DELETE") {
            const { ISDELETE } = params;
            updateOne = await models.MenuPermission.update(
                { ISDELETE: ISDELETE, UPDATE_DATE: new Date() },
                { where: { MENU_PERMISSION_ID: MENU_PERMISSION_ID } }
            );
        } else if (KEY == "VIEW") {
            const { ISVIEW } = params;
            updateOne = await models.MenuPermission.update(
                { ISVIEW: ISVIEW, UPDATE_DATE: new Date() },
                { where: { MENU_PERMISSION_ID: MENU_PERMISSION_ID } }
            );
        }
        let getQuery = await models.MenuPermission.findAll({
            where: { MENU_PERMISSION_ID: MENU_PERMISSION_ID },
            include: [{
                model: models.Menu,
                attributes: ["MENU_NAME"],
                required: true
            }],
            attributes:
                [["MENU_PERMISSION_ID", "MENU_PERMISSION_ID"],
                ["ISVIEW", "ISVIEW"],
                ["ISUPDATE", "ISUPDATE"],
                ["ISNEW", "ISNEW"],
                ["ISDELETE", "ISDELETE"],
                ["MENU_ID", "MENU_ID"]]
        });
        if (updateOne) {
            console.log(updateOne)
            return {
                status: true,
                msg: "Update data Successfully.",
                data: getQuery
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
 * @description Date - 29-12-2021 Create By Dipesh 
 * Update By
 * 
 */
async function getServices(params) {
    try {
        const { ROLE_ID, AGENT_ID } = params;
        var menuPermisisons = "SELECT MENU.MENU_NAME AS MENU_NAME, MENU.MENU_SLUG AS MENU_SLUG,  " +
                    " MENUPERMISSION.ISVIEW AS ISVIEW, MENUPERMISSION.ISUPDATE AS ISUPDATE,  " +
                    " MENUPERMISSION.ISNEW AS ISNEW, MENUPERMISSION.ISDELETE AS ISDELETE " +
                    " FROM MENU INNER JOIN MENUPERMISSION  " +
                    " WHERE MENU.MENU_ID = MENUPERMISSION.MENU_ID  " +
                    " AND MENUPERMISSION.ROLE_ID = " + ROLE_ID;
        var menuPermisison = await sequelize.query(menuPermisisons, { type: QueryTypes.SELECT });
        var getOneUser = await models.Agent.findOne({
            where: {
                AGENT_ID: AGENT_ID
            },
            attributes: [ "AGENT_PERMISSION_IDS" ]
        });
        var getAgentPermisisons = null;
        if (getOneUser.dataValues.AGENT_PERMISSION_IDS !== null) {
            getAgentPermisisons = await models.AgentPermission.findAll({
                where: { AGENT_PERMISSION_ID: { [Op.in]: getOneUser.dataValues.AGENT_PERMISSION_IDS.split(',').map(data => parseInt(data)) } },
                attributes: ["AGENT_PERMISSION_KEY"]
            });
        }
        return {
            status: true,
            msg: "Show data Successfully.",
            data: {
                agentpermission: getAgentPermisisons,
                menupermission: menuPermisison
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

module.exports = { listServices, updateServices, getServices };