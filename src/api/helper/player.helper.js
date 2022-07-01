const { encryptpassword } = require('../../common/password.auth');
const { insertServices, listServices, updateServices, deleteServices } = require('../services/player.services');

/***
 * 
 * @description Role Help For Request
 * 
 */
async function insertHelper(params) {
    try {
        var encryptPassword = await encryptpassword(params.PASSWORD);
        if (encryptPassword.status) {
            params.PASSWORD = encryptPassword.encrypt;
            var insertService = await insertServices(params);
            return insertService;
        } else {
            return encryptPassword;
        }
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
        const { PASSWORD } = params;
        if (PASSWORD != undefined) {
            var encryptPassword = await encryptpassword(PASSWORD);
            if (encryptPassword.status) {
                params.PASSWORD = encryptPassword.encrypt;
                var upadteService = await updateServices(params);
                return upadteService;
            } else {
                return encryptPassword;
            }
        } else {
            var upadteService = await updateServices(params);
            return upadteService;
        }
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
        var deleteService = await deleteServices(params);
        return deleteService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}




module.exports = { insertHelper, viewHelper, updateHelper, deleteHelper };