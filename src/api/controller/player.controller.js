const { insertHelper, viewHelper, updateHelper, deleteHelper } = require('../helper/player.helper');

/***
 * 
 * @description Role Insert 
 * 
 */
exports.insertController = async (req, res, next) => {
    var response;
    try {
        response = await insertHelper(req.body);
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
        req.body.PLAYER_ID = req.params.id;
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
 exports.deleteController = async (req, res, next) => {
    var response;
    try {
        response = await deleteHelper(req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};