const compression = require('compression');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// https://stackoverflow.com/questions/62396498/tslint-marks-body-parser-as-deprecated
// parse application/json
app.use(express.json());
app.use(express.raw());
app.use(cors());
app.use(compression());

// add middlewares
app.use(express.static(path.join(__dirname, "./../build")));
app.use('/public', express.static(path.join(__dirname, "./../public")));

app.use('/admin', require('./../api/index'));
app.use('/game', require('./../game/index'));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
//   });

// app.use('/admin', require('./../admin/v1/admin'));

require('./swagger.connection')(app);

// Send all other requests to the React app
app.use(express.static(path.join(__dirname, './../dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../build/index.html'));
});








/***
 * 
 * Middleware API - If not found any url
 * 
 */
app.use(async (req, res, next) => {

    /**
     * ERROR CODE FOR ROUTE NOT FOUND
     * 
     * const err = new Error("NOT FOUND");
     * 
     */

    res.statusCode = 404;
    return res.json({
        status: false,
        msg: 'The url you are trying to reach is not hosted on our server.'
    });
    // next(err);
});




module.exports = app;