const { loginHelper } = require('../helper/login.helper');

/***
 * 
 * @description Role Insert 
 * 
 */
exports.loginController = async (req, res, next) => {
    var response;
    try {
        response = await loginHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};