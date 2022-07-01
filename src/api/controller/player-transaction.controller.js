const { insertHelper, viewHelper, updateHelper, deleteHelper, getHelper, viewOneHelper } = require('../helper/player-transaction.helper');

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
 * @description Role Pagination View in Table 
 * 
 */
 exports.getOneController = async (req, res, next) => {
    var response;  
    try {
        response = await viewOneHelper(req.body);
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
        req.body.TRANSACTION_ID = req.params.id;
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


/***
 * 
 * @description Get Agent Data
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