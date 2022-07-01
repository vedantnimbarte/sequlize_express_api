var router = require('express').Router();

router.use('/login', require('./router/login.router'));

router.use('/bet', require('./router/bet.router'));

/***
 * 
 * Middleware API - If not found any url
 * 
 */
router.use(function (req, res, next) {
    var err = {};
    err.status = 404;
    err.msg = "Not Found";
    next(res.json({ status: false, msg: err }));
});
module.exports = router;