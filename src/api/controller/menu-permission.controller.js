const { viewHelper, updateHelper, getHelper } = require('../helper/menu-permission.helper');

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
 * @description Role Update 
 * 
 */
 exports.updateController = async (req, res, next) => {
    var response;
    try {
        req.body.AGENT_PERMISSION_ID = req.params.id;
        response = await updateHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};

/***
 * 
 * @description Role Update 
 * 
 */
 exports.getController = async (req, res, next) => {
    var response;
    try {
        response = await getHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};