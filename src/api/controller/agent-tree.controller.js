const { viewHelper, infoHelper } = require('../helper/agent-tree.helper');

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

/***
 * 
 * @description Role Pagination View in Table 
 * 
 */
 exports.infoController = async (req, res, next) => {
    var response;
    try {
        response = await infoHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};
