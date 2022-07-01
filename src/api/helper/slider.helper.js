const { insertServices, listServices, updateServices, deleteServices } = require('../services/slider.services');

/***
 * 
 * @description Role Help For Request
 * 
 */
async function insertHelper(params) {
    try {
        var insertService = await insertServices(params);
        return insertService;
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
 async function deleteHelper(params) {
    try {
        var upadteService = await deleteServices(params);
        return upadteService;
    } catch (error) {
        console.log(error)
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}




module.exports = { insertHelper, viewHelper,  updateHelper, deleteHelper };