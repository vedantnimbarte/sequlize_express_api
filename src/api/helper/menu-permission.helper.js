const { listServices, updateServices, getServices } = require('../services/menu-permission.services');


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
 * @description Role Help For Drop Down
 * 
 */
async function updateHelper(params) {
    try {
        var upadteService = await updateServices(params);
        return upadteService;
    } catch (error) {
        console.log(error)
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
 async function getHelper(params) {
    try {
        var getService = await getServices(params);
        return getService;
    } catch (error) {
        console.log(error)
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

module.exports = { viewHelper, updateHelper , getHelper };