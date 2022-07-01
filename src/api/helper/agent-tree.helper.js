const { listServices, infoServices } = require('../services/agent-tree.services');


/***
 * 
 * @description Role Help For Pagination
 * 
 */
async function viewHelper(params) {
    try {
        var listService = await listServices(params);
        return listService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}


/***
 * 
 * @description Role Help For Pagination
 * 
 */
 async function infoHelper(params) {
    try {
        var infoService = await infoServices(params);
        return infoService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

module.exports = { viewHelper, infoHelper };