const { insertHelper, viewHelper, updateHelper, deleteHelper } = require('../helper/game.helper');
const { startUploadSingleFile } = require('../middleware/upload.file.middleware');
var path = require('path');
var fs = require('fs');

/***
 * 
 * @description Role Insert 
 * 
 */
exports.insertController = async (req, res, next) => {
    var response = await startUploadSingleFile(req, res);
    try {
        if (response.status) {
            req.body.GAME_IMAGE = response.imageurl;
            response = await insertHelper(req.body);
            if (response.status) {
                res.json(response);
            } else {
                var deletePath = path.join(__dirname, process.env.IMAGE_PATH, req.body.GAME_IMAGE);
                await fs.unlink(deletePath, (err) => { });
                res.json(response);
            }
        } else {
            res.json(response);
        }
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
        req.body.GAME_ID = req.params.id;
        req.body.ISFILE = false;
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
exports.fileupdateController = async (req, res, next) => {
    var response;
    try {
        var response = await startUploadSingleFile(req, res);
        if (response.status) {
            req.body.GAME_ID = req.params.id;
            console.log(req.params.id)
            req.body.ISFILE = true;
            req.body.GAME_IMAGE = response.imageurl;
            var deleteFile = response.imageurl;
            response = await updateHelper(req.body);
            if (response.status == false) {
                var deletePath = path.join(__dirname, process.env.IMAGE_PATH, deleteFile);
                await fs.unlink(deletePath, (err) => { });
            } else if (response.status == true) {
                var deletePath = path.join(__dirname, process.env.IMAGE_PATH, req.body.oldImage);
                await fs.unlink(deletePath, (err) => { });
            }
            res.json(response);
        } else {
            res.json(response);
        }
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