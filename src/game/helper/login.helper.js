const { loginServices } = require('../services/login.services');

/***
 * 
 * @description Role Help For Request
 * 
 */
async function loginHelper(params) {
    try {
        var loginService = await loginServices(params);
        return loginService;
    } catch (error) {
        return {
            status: false,
            msg: "Helper Error."
        };
    }
}

module.exports = { loginHelper };