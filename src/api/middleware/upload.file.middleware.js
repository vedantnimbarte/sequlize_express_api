var multer = require('multer');
var util = require('util');
const { v4: uuid4 } = require('uuid');
// var CommonValidator = require('./../common/validator');


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + './../../public/');
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split('.');
    cb(null, uuid4() + '.' + ext[ext.length - 1]);
  }
});

var uploadF = multer({ storage: storage, preservePath: false });

async function startUploadSingleFile(req, res) {
  let filename;
  try {
    const upload = util.promisify(uploadF.single('FILEUPLOAD'));
    await upload(req, res);
    filename = req.file.filename;
    if (filename != undefined) {
      return {
        status: true,
        imageurl: filename
      };
    } else {
      return {
        status: false,
        msg: "File must be require."
      };
    }
  } catch (e) {
    return {
      status: false,
      msg: "Only image files are allowed!"
    };
  }
}

module.exports = { startUploadSingleFile };
