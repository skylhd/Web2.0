$(document).ready(function(){
	attachEvents();
	s5();
});

function attachEvents() {
	$(".button").click(getRandomFromServer);
	$(".info").click(getSum);
	document.getElementsByClassName("apb")[0].addEventListener("transitionend", resetBtns);
	$(".apb").mouseenter(resetBtns);
}

function getRandomFromServer() {
	var obj = this;
	var n = obj.className.substr(7,1).toUpperCase();
	console.log(n + " start");
	if (!($(obj).hasClass("complete"))&&!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(".info").addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				$(obj).addClass("disable");
				var num = data.toString();
				$("." + n + " > span").html(num);
				$(obj).addClass("complete");
				console.log(n + " finished");
				if ($(".num").length == 5) {
					$(".info").removeClass("disable");
					$(".sum").html("");
				}
			} else {
				$("." + n + " > span").html("!");
			}
			$(obj).siblings().each(function(i, e){
				if (!($(e).hasClass("complete"))) {
					$(e).removeClass("disable");
				}
			});
		});
	}
}



function s5() {
	$(".apb").click(function(){
		resetBtns();
		var array1 = ["A", "B", "C", "D", "E"];
		var atonum = {
			"A":aHandler,
			"B":bHandler,
			"C":cHandler,
			"D":dHandler,
			"E":eHandler
		}
		array1.sort(function(){
			return 0.5-Math.random();
		})
		$(".sum").html(array1.join(""));
		var array = [];
		for (var i = 0; i < 5; i++) {
			array[i] = atonum[array1[i]];
		}
		array[0](array, 0, 0);
		//robot(array, array1, 0);
	});
}

function callbackt(sum) {
	$(".sum").html(sum);
}

function robot(arr, array1, sum) {
	var obj = arr[0](function(sum) {
		sum += parseInt($("." + array1[0] + " > span").html());
		return arr[1](function(sum){
			sum += parseInt($("." + array1[1] + " > span").html());
			return arr[2](function(sum){
				sum += parseInt($("." + array1[2] + " > span").html());
				return arr[3](function(sum){
					sum += parseInt($("." + array1[3] + " > span").html());
					return arr[4](function(sum){
						sum += parseInt($("." + array1[4] + " > span").html());
						bubbleHandler(sum);
					}, sum);
				}, sum);
			}, sum);
		}, sum);
	}, sum);
	if (obj.message != "OK") {
		robot(arr, array1, sum)
	}
}

/* function aHandler(func, sum) {
	if (0.5>Math.random()) {
		$(".A").click();
		var interval = setInterval(function(){
			if ($(".A").hasClass("complete")) {
				clearInterval(interval);
				$(".sum").html("这是个天大的秘密");
				var obj = func(sum);
				if (obj.message != "OK") {
					callback(obj.message, obj.currentSum, func);
				}
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"这不是天大的秘密", currentSum:sum};
	}
}

function bHandler(func, sum) {
	if (0.5>Math.random()) {
		$(".B").click();
		var interval = setInterval(function(){
			if ($(".B").hasClass("complete")) {
				clearInterval(interval);
				$(".sum").html("我不知道");
				var obj = func(sum);
				if (obj.message != "OK") {
					callback(obj.message, obj.currentSum, func);
				}
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"我知道", currentSum:sum};
	}
}

function cHandler(func, sum) {
	if (0.5>Math.random()) {
		$(".C").click();
		var interval = setInterval(function(){
			if ($(".C").hasClass("complete")) {
				clearInterval(interval);
				$(".sum").html("你不知道");
				var obj = func(sum);
				if (obj.message != "OK") {
					callback(obj.message, obj.currentSum, func);
				}
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"你知道", currentSum:sum};
	}
}

function dHandler(func, sum) {
	if (0.5>Math.random()) {
		$(".D").click();
		var interval = setInterval(function(){
			if ($(".D").hasClass("complete")) {
				clearInterval(interval);
				$(".sum").html("他不知道");
				var obj = func(sum);
				if (obj.message != "OK") {
					callback(obj.message, obj.currentSum, func);
				}
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"他知道", currentSum:sum};
	}
}

function eHandler(func, sum) {
	if (0.5>Math.random()) {
		$(".E").click();
		var interval = setInterval(function(){
			if ($(".E").hasClass("complete")) {
				clearInterval(interval);
				$(".sum").html("才怪");
				var obj = func(sum);
				if (obj.message != "OK") {
					callback(obj.message, obj.currentSum, func);
				}
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"才不怪", currentSum:sum};
	}
}

function bubbleHandler(sum) {
	if (0.5>Math.random()) {
		$(".sum").click();
		var interval = setInterval(function(){
			if (!isNaN(parseInt($(".sum").html()))) {
				clearInterval(interval);
				$(".sum").html("楼主异步调用战斗力感人，目测不超过" + sum);
			}
		}, 100);
		return {message:"OK"};
	} else {
		return {message:"sum", currentSum:sum};
	}
} */

function callback(mess, curSum, arr, i) {
	var obj;
	var str;
	switch(mess) {
		case "这不是天大的秘密": obj = $(".A");
		                         str = "这是个天大的秘密"
								 break;
		case "我知道": obj = $(".B");
					   str = "我不知道"
					   break;
		case "你知道": obj = $(".C");
					   str = "你不知道"
					   break;
		case "他知道": obj = $(".D");
					   str = "他不知道"
					   break;
		case "才不怪": obj = $(".E");
					   str = "才怪"
					   break;
		case "sum": obj = $(".sum");
					str = "楼主异步调用战斗力感人，目测不超过" + curSum;
		default:
			obj = null;
	}
	if (obj != null) {
		$(".sum").html(str);
		if (arr) {
			arr[i](arr, i, curSum);
		}
	}
}

function aHandler(arr, i, curSum) {
	var obj = $(".A");
	console.log("call A");
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success"&&0.5>Math.random()) {
				var num = data.toString();
				$(".A > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				if (i < 4) {
					$(".sum").html("这是个天大的秘密");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			} else {
				callback("这不是天大的秘密", curSum, arr, i);
			}
		});
	}
}

function bHandler(arr, i, curSum) {
	var obj = $(".B");
	console.log("call B");
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success"&&0.5>Math.random()) {
				var num = data.toString();
				$(".B > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				if (i < 4) {
					$(".sum").html("我不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			} else {
				callback("我知道", curSum, arr, i);
			}
		});
	}
}

function cHandler(arr, i, curSum) {
	var obj = $(".C");
	console.log("call C");
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success"&&0.5>Math.random()) {
				var num = data.toString();
				$(".C > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				if (i < 4) {
					$(".sum").html("你不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			} else {
				callback("你知道", curSum, arr, i);
			}
		});
	}
}

function dHandler(arr, i, curSum) {
	var obj = $(".D");
	console.log("call D");
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success"&&0.5>Math.random()) {
				var num = data.toString();
				$(".D > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				if (i < 4) {
					$(".sum").html("他不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			} else {
				callback("他知道", curSum, arr, i);
			}
		});
	}
}

function eHandler(arr, i, curSum) {
	var obj = $(".E");
	console.log("call E");
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success"&&0.5>Math.random()) {
				var num = data.toString();
				$(".E > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				if (i < 4) {
					$(".sum").html("才怪");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			} else {
				callback("才不怪", curSum, arr, i);
			}
		});
	}
}

function bubbleHandler(sum) {
	console.log("call bubble");
	if ($(".num").length == 5&&0.5>Math.random()) {
		$(".sum").html("楼主异步调用战斗力感人，目测不超过" + sum);
		$(".info").addClass("disable");
	} else {
		callback("sum", curSum, null, null);
	}
}


function resetBtns() {
	$(".button > span").html("").attr("class", "nothing");
	$(".button").removeClass("disable");
	$(".button").removeClass("complete");
	$(".info").addClass("disable");
	$(".sum").html("");
}

function getSum() {
	if (!($(".info").hasClass("disable"))) {
		var sum = 0;
		$(".num").each(function(i, e){
			sum += parseInt($(e).html());
		});
		$(".sum").html(sum);
		$(".info").addClass("disable");
		$(".button").removeClass("disable");
		$(".button").removeClass("complete");
	}
}

