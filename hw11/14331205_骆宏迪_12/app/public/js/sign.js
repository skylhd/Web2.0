
$(document).ready(function(){
	attachEvents();
});

function attachEvents() {
	$("#uname").blur(nameChange);
    $("#upass").blur(passChange);
    $("#urepeat").blur(repeatChange);
	$("#unum").blur(numChange);
	$("#uphone").blur(phoneChange);
	$("#umail").blur(emailChange);
	$("#reset").click(resetData);
	$("#regform").submit(submitData);
}

function passChange() {
    $("#passcheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#upass").val();
	if (str == "") {
		$("#passcheck").attr("class", "wrong");
		$("#passcheck").closest("td").append("密码不能为空");
	} else {
        if (str.match(/^[a-zA-Z0-9_-]{6,12}$/) == null) {
			$("#passcheck").attr("class", "wrong");
			$("#passcheck").closest("td").append("密码为6~12位数字、大小写字母、中划线、下划线");
		} else {
            $("#passcheck").attr("class", "correct");
        }
	}
}

function repeatChange() {
    $("#repeatcheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#urepeat").val();
	if (str == "") {
		$("#repeatcheck").attr("class", "wrong");
		$("#repeatcheck").closest("td").append("密码不能为空");
	} else {
        var pass = $("#upass").val();
        if (str != pass) {
			$("#repeatcheck").attr("class", "wrong");
			$("#repeatcheck").closest("td").append("与密码不相同+");
		} else {
            $("#repeatcheck").attr("class", "correct");
        }
	}
}

function nameChange() {
	$("#namecheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#uname").val();
	if (str == "") {
		$("#namecheck").attr("class", "wrong");
		$("#namecheck").closest("td").append("用户名不能为空");
	} else {
		if (str[0].match(/[a-zA-Z]/) == null) {
			$("#namecheck").attr("class", "wrong");
			$("#namecheck").closest("td").append("用户名必须以英文字母开头");
		} else {
			if (str.match(/^\w{6,18}$/) == null) {
				$("#namecheck").attr("class", "wrong");
				$("#namecheck").closest("td").append("用户名必须由6~18位英文字母、数字或下划线组成");
			} else {
				$("#namecheck").attr("class", "wait");
				//向服务器提交异步查询是否重复
				check(str, "username");
			}
		}
	}
}

function numChange() {
	$("#numcheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#unum").val();
	if (str == "") {
		$("#numcheck").attr("class", "wrong");
		$("#numcheck").closest("td").append("学号不能为空");
	} else {
		if (str[0].match(/[1-9]/) == null) {
			$("#numcheck").attr("class", "wrong");
			$("#numcheck").closest("td").append("学号不能以0开头");
		} else {
			if (str.match(/^\d{8,8}$/) == null) {
				$("#numcheck").attr("class", "wrong");
				$("#numcheck").closest("td").append("学号必须为8位数字");
			} else {
				$("#numcheck").attr("class", "wait");
				check(str, "num");
			}
		}
	}
}

function phoneChange() {
	$("#phonecheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#uphone").val();
	if (str == "") {
		$("#phonecheck").attr("class", "wrong");
		$("#phonecheck").closest("td").append("电话不能为空");
	} else {
		if (str[0].match(/[1-9]/) == null) {
			$("#phonecheck").attr("class", "wrong");
			$("#phonecheck").closest("td").append("电话不能以0开头");
		} else {
			if (str.match(/^\d{11,11}$/) == null) {
				$("#phonecheck").attr("class", "wrong");
				$("#phonecheck").closest("td").append("电话必须为11位数字");
			} else {
				$("#phonecheck").attr("class", "wait");
				check(str, "phone");
			}
		}
	}
}

function emailChange() {
	$("#mailcheck").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
	var str = $("#umail").val();
	if (str == "") {
		$("#mailcheck").attr("class", "wrong");
		$("#mailcheck").closest("td").append("邮箱不能为空");
	} else {
		if (str.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/) == null) {
			$("#mailcheck").attr("class", "wrong");
			$("#mailcheck").closest("td").append("邮箱格式不对");
		} else {
			$("#mailcheck").attr("class", "wait");
			check(str, "email");
		}
	}
}

function resetData() {
	$("span").attr("class", "");
	$("[type='text']").prop("value", "");
    $("[type='password']").prop("value", "");
	$("td>span").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
}

function submitData() {
	if (checkAll()) {
		$("#uname").prop("value", $("#uname").val());
        $("#upass").prop("value", $("#upass").val());
		$("#unum").prop("value", $("#unum").val());
		$("#uphone").prop("value", $("#uphone").val());
		$("#umail").prop("value", $("#umail").val());
		return true;
	} else {
		alert("你还有没按要求填的项。");
		return false;
	}
}

function checkAll() {
	if (!($("#namecheck").hasClass("correct"))) return false;
	if (!($("#numcheck").hasClass("correct"))) return false;
	if (!($("#phonecheck").hasClass("correct"))) return false;
	if (!($("#mailcheck").hasClass("correct"))) return false;
    if (!($("#passcheck").hasClass("correct"))) return false;
    if (!($("#repeatcheck").hasClass("correct"))) return false;
	return true;
}

function check(val, str) {
	if (str == "username") {
		$.get("",{
			a : str,
			username : val,
		}, function(data, state) {
			if (data == "repeat") {
				$("#namecheck").attr("class", "wrong");
				$("#namecheck").closest("td").append("用户名已被注册");
			} else {
                if (data == "retry") {
                    $("#namecheck").attr("class", "wrong");
                    $("#namecheck").closest("td").append("查询失败，请重试");
                } else {
                    if (data == "no-repeat") {
                        $("#namecheck").attr("class", "correct");
                    } else {
                        $("#namecheck").attr("class", "wrong");
                        $("#namecheck").closest("td").append("未知错误，请重新输入");
                    }
                }
			}
		})
	}
	if (str == "num") {
		$.get("",{
			a : str,
			num : val,
		}, function(data, state) {
			if (data == "repeat") {
				$("#numcheck").attr("class", "wrong");
				$("#numcheck").closest("td").append("学号已被注册");
			} else {
				if (data == "retry") {
                    $("#numcheck").attr("class", "wrong");
                    $("#numcheck").closest("td").append("查询失败，请重试");
                } else {
                    if (data == "no-repeat") {
                        $("#numcheck").attr("class", "correct");
                    } else {
                        $("#numcheck").attr("class", "wrong");
                        $("#numcheck").closest("td").append("未知错误，请重新输入");
                    }
                }
			}
		})
	}
	if (str == "phone") {
		$.get("",{
			a : str,
			phone : val,
		}, function(data, state) {
			if (data == "repeat") {
				$("#phonecheck").attr("class", "wrong");
				$("#phonecheck").closest("td").append("电话已被注册");
			} else {
				if (data == "retry") {
                    $("#phonecheck").attr("class", "wrong");
                    $("#phonecheck").closest("td").append("查询失败，请重试");
                } else {
                    if (data == "no-repeat") {
                        $("#phonecheck").attr("class", "correct");
                    } else {
                        $("#phonecheck").attr("class", "wrong");
                        $("#phonecheck").closest("td").append("未知错误，请重新输入");
                    }
                }
			}
		})
	}
	if (str == "email") {
		$.get("",{
			a : str,
			email : val,
		}, function(data, state) {
			if (data == "repeat") {
				$("#mailcheck").attr("class", "wrong");
				$("#mailcheck").closest("td").append("邮箱已被注册");
			} else {
				if (data == "retry") {
                    $("#mailcheck").attr("class", "wrong");
                    $("#mailcheck").closest("td").append("查询失败，请重试");
                } else {
                    if (data == "no-repeat") {
                        $("#mailcheck").attr("class", "correct");
                    } else {
                        $("#mailcheck").attr("class", "wrong");
                        $("#mailcheck").closest("td").append("未知错误，请重新输入");
                    }
                }
			}
		})
	}
}

