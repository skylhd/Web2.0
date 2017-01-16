var express = require('express'),
    url = require("url");
var router = express.Router();
var cookie = require('cookie');

router.get('/', function(req, res, next) {
    if (req.signedCookies.username != undefined) {
        res.clearCookie('username')
        res.render('index',{ ErrorMessage:'你已成功推出' });
    } else {
        res.render('index',{ ErrorMessage:'' });
    }
});

router.post('/',function(req, res, next) {
    if (req.signedCookies.username != undefined) {
        console.log('here\n')
        res.clearCookie('username')
        res.render('index',{ ErrorMessage:'你已成功退出' });
    } else {
        res.render('index',{ ErrorMessage:'' });
    }
})

module.exports = router;