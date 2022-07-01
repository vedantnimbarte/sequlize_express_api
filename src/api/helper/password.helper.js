const { updateServices } = require('../services/password.services');

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





module.exports = {  updateHelper };