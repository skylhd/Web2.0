var express = require('express'),
    url = require("url");
var router = express.Router();
var cookie = require('cookie');
var crypto = require('crypto');
var userModel = require('./db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = req.query;
    if (info.username != undefined) {
        if (req.signedCookies.username != undefined) {
            if (req.signedCookies.username == info.username) {
                logbycookie(req, res, next, "")
            } else {
                logbycookie(req, res, next, "只能访问自己的数据")
            }
        } else {
            res.render('index',{ ErrorMessage:'你还没有登录' });
        }
    } else {
        console.log(req.signedCookies);
        if (req.signedCookies.username != undefined) {
            logbycookie(req, res, next, "")
        } else {
            res.render('index',{ ErrorMessage:'' });
        }
    }
});

router.post('/',function(req, res, next) {
    var info = req.body;
    if (info.username == undefined||info.password == undefined) {
        res.render('index',{ ErrorMessage:'错误的用户名或密码' });
    } else {
        var temp = {'username':info.username};
        userModel.find(temp, function(err, result){
            if (err) {
                console.log(err);
                res.render('index',{ ErrorMessage:'错误的用户名或密码' });
            } else {
                if (result.length == 0) {
                    res.render('index',{ ErrorMessage:'错误的用户名或密码' });
                } else {
                    var decipher = crypto.createDecipher('aes192', 'mo')
                    var dec = decipher.update(result[0].password, 'hex', 'ascii');
                    dec += decipher.final('ascii')
                    if (dec != info.password) {
                        res.render('index',{ ErrorMessage:'错误的用户名或密码' });
                    } else {
                        res.cookie('username', info.username, {signed : true, maxAge: 900000,expires: new Date(Date.now() + 900000), httpOnly: true})
                        res.redirect('?username='+info.username)
                    }
                }
            }
        });
    }
})

function logbycookie(req, res, next, error) {
    var temp = {'username':req.signedCookies.username};
    userModel.find(temp, function(err, result){
        if (err) {
            console.log(err)
            res.render('index',{ ErrorMessage:'' });
        } else {
            if (result.length == 0) {
                res.clearCookie('username')
                res.render('index',{ ErrorMessage:'' });
            } else {
                var dict = result[0]
                dict["ErrorMessage"] = error;
                res.render('view',dict);
            }
        }
    });
}

module.exports = router;
