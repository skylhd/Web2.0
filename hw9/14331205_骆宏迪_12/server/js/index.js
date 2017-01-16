
$(document).ready(function(){
	attachEvents();
	
});

function attachEvents() {
	$("#uname").blur(nameChange);
	$("#unum").blur(numChange);
	$("#uphone").blur(phoneChange);
	$("#umail").blur(emailChange);
	$("#reset").click(resetData);
	$("#regform").submit(submitData);
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
	$("td>span").closest("td").contents().filter(function(){
		return this.nodeType != 1;
	}).remove();
}

function submitData() {
	if (checkAll()) {
		$("#uname").prop("value", $("#uname").val());
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
				$("#namecheck").attr("class", "correct");
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
				$("#numcheck").attr("class", "correct");
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
				$("#phonecheck").attr("class", "correct");
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
				$("#mailcheck").attr("class", "correct");
			}
		})
	}
}

