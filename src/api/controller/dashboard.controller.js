const { viewHelper } = require('../helper/dashboard.helper');

/***
 * 
 * @description Role Pagination View in Table 
 * 
 */
 exports.viewController = async (req, res, next) => {
    var response;
    try {
        response = await viewHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};



