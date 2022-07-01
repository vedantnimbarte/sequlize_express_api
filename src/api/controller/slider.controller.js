const { insertHelper, viewHelper, updateHelper, deleteHelper } = require('../helper/slider.helper');
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
        console.log(req.body, req.file)
        if (response.status) {
            req.body.SLIDER_IMAGE_URL = response.imageurl;
            response = await insertHelper(req.body);
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
        req.body.SLIDER_ID = req.params.id;
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
            req.body.SLIDER_ID = req.params.id;
            req.body.ISFILE = true;
            req.body.SLIDER_IMAGE_URL = response.imageurl;
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
        if (response.status) {
            var deletePath = path.join(__dirname, process.env.IMAGE_PATH, req.body.SLIDER_IMAGE_URL);
            await fs.unlink(deletePath, (err) => { });
        }
        res.json(response);
    } catch (error) {
        res.json({ error: error });
    }
};