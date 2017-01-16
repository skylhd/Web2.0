var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs"),
	querystring = require('querystring'),
	express = require('express')

var app = express()
var database = new Array();
	
var server = http.createServer(function(req, res) {
	main(req, res);
});

server.listen(8000);
console.log("Server is listening");
readFromJSON();

function user(name, num, phone, email) {
	this["username"] = name;
	this["num"] = num;
	this["phone"] = phone;
	this["email"] = email;
}

function isSame(a, b) {
	return a.username==b.username&&a.num==b.num&&a.phone==b.phone&&a.email==b.email;
}

function isRelative(a, b) {
	return a.username==b.username||a.num==b.num||a.phone==b.phone||a.email==b.email;
}

function readFromJSON() {
	fs.exists("data/database.json", function(e){
		if (e) {
			fs.readFile("data/database.json", function(err, data){
				if (err) {
					console.log(err);
					console.log("fail to read data");
				} else {
					console.log("success to read data");
					database = JSON.parse(data.toString());
				}
			});
		} else {
			console.log("no data");
		}
	})
}

function main(req, res) {
	if (req.method === 'POST') {
		post(req, res);
	} else {
		if (req.method === 'GET') {
			get(req, res);
		} else {
			res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
			res.end("未知请求");
		}
	}
}

function get(req, res) {
	var rurl = url.parse(req.url);
	if (rurl.query == null) {
		getFile(req, res);
	} else {
		var obj = querystring.parse(rurl.query);
		if (obj.a != null) {
			//单独检查单项是否重复
			checkOne(req, res, obj);
		} else {
			//判断是否通过username来查询
			if ((obj.num == undefined||obj.phone==undefined||obj.email==undefined)&&obj.username!=undefined) {
				if (checkName(obj.username)) { //判断格式是否符合
					var f = true;
					for (var i = 0; i < database.length; i++) {
						if (database[i].username == obj.username) {
							returnPage(req, res, database[i]);
							f = false;
							break;
						}
					}
					if (f) {
						getFile(req, res);
					}
				} else {
					res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
					res.write("用户名格式错误");
					res.end();
				}
			}
		}
	}
}

function post(req, res) {
	console.log("POST");
	var obj = "";
	req.on('data', function(data){
		obj += data;
	});
	req.on('end', function(){
		obj = querystring.parse(obj);
		if (checkTheparams(req, res, obj)) {
			var flag = true;
			for (var i = 0; i < database.length; i++) {
				if (isRelative(obj, database[i])) {
					if (isSame(obj, database[i])) {
						returnPage(req, res, database[i]); //返回详情页
					} else {
						returnFault(req, res, obj, database[i]); //返回错误信息
					}
					flag = false;
					break;
				}
			}
			if (flag) {
				//增加新用户
				database.push(new user(obj.username, obj.num, obj.phone, obj.email));
				fs.writeFileSync('data/database.json', JSON.stringify(database));
				returnPage(req, res, database[database.length - 1]); //返回详情页
			}
		}
	});
}

function checkOne(req, res, obj) {
	var flag = true;
	res.writeHead(200, {"Content-Type": "text/plain"});
	for (var i = 0; i < database.length; i++) {
		if (database[i][obj.a] == obj[obj.a]) {
			flag = false;
			break;
		}
	}
	if (flag) {
		res.end("no-repeat");
	} else {
		res.end("repeat");
	}
}

function returnFault(req, res, a, b) {
	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	res.write("注册失败\n");
	if (a.username == b.username) {
		res.write("用户名重复\n");
	}
	if (a.num == b.num) {
		res.write("学号重复\n");
	}
	if (a.phone == b.phone) {
		res.write("电话重复\n");
	}
	if (a.email == b.email) {
		res.write("邮箱重复\n");
	}
	res.end();
}

function checkName(str) {
	if (str.match(/^\w{6,18}$/) == null) {
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

function checkTheparams(req, res, obj) {
	var str = "";
	var flag = true;
	if (!checkName(obj.username)) {
		console.log("name")
		str += "用户名格式错误\n";
		flag = false;
	}
	if (!checkNum(obj.num)) {
		console.log("num")
		str += "学号格式错误\n";
		flag = false;
	}
	if (!checkPhone(obj.phone)) {
		console.log("name")
		str += "电话格式错误\n";
		flag = false;
	}
	if (!checkEmail(obj.email)) {
		console.log("name")
		str += "邮箱格式错误\n";
		flag = false;
	}
	if (flag) {
		return true;
	} else {
		console.log(str);
		res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
		res.end(str);
		return false;
	}
}

function returnPage(req, res, obj) {
}

function getFile(req, res) {
	var pathname = __dirname + url.parse(req.url).pathname;
	if (path.extname(pathname) == "") {
		pathname+="/";
	}
	if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="html/index.html";
    }
	fs.exists(pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html", "charset":"utf-8"});
					fs.readFile(pathname,function (err,data){
						res.end(data.toString());
					});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
					fs.readFile(pathname,function (err,data){
						res.end(data.toString());
					});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
					fs.readFile(pathname,function (err,data){
						res.end(data.toString());
					});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
					fs.readFile(pathname,function (err,data){
						res.end(data);
					});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
					fs.readFile(pathname,function (err,data){
						res.end(data);
					});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
					fs.readFile(pathname,function (err,data){
						res.end(data);
					});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
					fs.readFile(pathname,function (err,data){
						res.end(data);
					});
            }
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
	});
}
