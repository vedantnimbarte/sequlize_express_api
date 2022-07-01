const { createServices, updateServices } = require('../services/bet.services');


/***
 * 
 * @description Role Help For Pagination
 * 
 */
async function createHelper(params, payload) {
    try {
        var listService = await createServices(params, payload);
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
 * @description Role Help For Drop Down
 * 
 */
async function updateHelper(params, payload) {
    try {
        var upadteService = await updateServices(params, payload);
        return upadteService;
    } catch (error) {
        console.log(error)
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}



module.exports = { createHelper, updateHelper };