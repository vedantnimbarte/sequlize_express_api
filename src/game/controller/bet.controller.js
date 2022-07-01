const { createHelper, updateHelper } = require('../helper/bet.helper');

/***
 * 
 * @description Insert 
 * 
 */
exports.createController = async (req, res, next) => {
    var response;
    try {
        // console.log(req.body.toString())
        // JSON.parse(req.body.toString())
        response = await createHelper(req.body, req.payload);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};

/***
 * 
 * @description Update
 * 
 */
 exports.updateController = async (req, res, next) => {
    var response;
    try {
        console.log("Hello " , req.payload, JSON.parse(req.body.toString()))
        // JSON.parse(req.body.toString())
        response = await updateHelper(JSON.parse(req.body.toString()), req.payload);
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};