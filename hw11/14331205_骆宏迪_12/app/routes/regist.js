var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var userModel = require('./db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var info = req.query;
    console.log(info)
    if (info.a != undefined) {
        info.a = undefined;
        userModel.find(info, function(err, result) {
            res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
            if (err) {
                console.log(err);
                res.end("retry");
            } else {
                if (result.length > 0) {
                    console.log("repeat")
                    res.end("repeat");
                } else {
                    console.log("no-repeat")
                    res.end("no-repeat");
                }
            }
        });
    } else {
        
        res.render('regist');
    }
});

router.post('/', function(req, res, next) {
    if (checkTheparams(req, res, next)) {
        var info = req.body;
        info.repeatpassword = undefined;
        userModel.find(info, function(err, result){
            if (err) {
                console.log(err)
                res.render('regist',{ErrorMessage:"�������ݿ�ʧ�ܣ����Ժ�����"});
            } else {
                if (result.length > 0) {
                    res.render('regist',{ErrorMessage:"���û��ѱ�ע��"});
                } else {
                    var cipher = crypto.createCipher('aes192','mo');
                    var enc = cipher.update(info.password, 'ascii', 'hex');
                    enc += cipher.final('hex')
                    info.password = enc;
                    var newt = new userModel({
                        username : info.username,
                        password : info.password,
                        num : info.num,
                        phone : info.phone,
                        email : info.email
                    })
                    newt.save(function(serr, sresult){
                        if (serr) {
                            console.log(serr);
                            res.render('regist',{ErrorMessage:"д�����ݿ�ʧ�ܣ����Ժ�����"});
                        } else {
                            res.cookie('username', newt.username, {signed : true, maxAge: 900000,expires: new Date(Date.now() + 900000), httpOnly: true})
                            res.redirect('/')
                        }
                    })
                }
            }
        });
    }
});

function checkName(str) {
	if (str.match(/^\w{6,18}$/) == null) {
		return false;
	}
	return true;
}

function checkPass(str) {
    if (str.match(/^[a-zA-Z_-]{6,12}$/)) {
        return false;
    }
    return true;
}

function checkNum(str) {
	if (str.match(/^[1-9]\d{7,7}$/) == null) {
		return false;
	}
	return true;
}

function checkPhone(str) {
	if (str.match(/^[1-9]\d{10,10}$/) == null) {
		return false;
	}
	return true;
}

function checkEmail(str) {
	if (str.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) == null) {
		return false;
	}
	return true;
}

function checkTheparams(req, res, next) {
    var obj = req.body;
	var str = "";
	var flag = true;
	if (!checkName(obj.username)) {
		console.log("name")
		str += "�û�����ʽ����\n";
		flag = false;
	}
    if (!checkPass(obj.password)) {
		console.log("password")
		str += "�����ʽ����\n";
		flag = false;
	}
	if (!checkNum(obj.num)) {
		console.log("num")
		str += "ѧ�Ÿ�ʽ����\n";
		flag = false;
	}
	if (!checkPhone(obj.phone)) {
		console.log("name")
		str += "�绰��ʽ����\n";
		flag = false;
	}
	if (!checkEmail(obj.email)) {
		console.log("name")
		str += "�����ʽ����\n";
		flag = false;
	}
	if (flag) {
		return true;
	} else {
        res.render('regist', {ErrorMessage:str})
		return false;
	}
}

module.exports = router;