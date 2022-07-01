const {  listServices } = require('../services/dashboard.services');



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



module.exports = { viewHelper };