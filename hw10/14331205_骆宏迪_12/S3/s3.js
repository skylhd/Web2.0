var flag = true;
var sumflag = true;
var pool = [];

$(document).ready(function(){
	attachEvents();
	s3();
});

function s3 () {
	$(".apb").click(function(){
		resetBtns();
		robot2();
	});
}

function robot2() {
	getNum("A");
	getNum("B");
	getNum("C");
	getNum("D");
	getNum("E");
}

function getNum(str) {
	var obj = $("." + str);
	$(obj).children("span").html("...").attr("class", "num");
	var p = $.get("num" + str,"",function(data, state){
		if (state == "success") {
			var num = data.toString();
			$("." + str + " > span").html(num);
			$("." + str + " > span").addClass("complete");
			$(obj).addClass("disable");
			if ($(".complete").length == 5) {
				$(".info").removeClass("disable");
				$(".sum").html("");
				sumflag = true;
				$(".info").click();
			}
		} else {
			$("." + n + " > span").html("!");
		}
	});
	pool.push(p);
}

function attachEvents() {
	$(".button").click(getRandomFromServer);
	$(".info").click(getSum);
	document.getElementsByClassName("apb")[0].addEventListener("transitionend", resetBtns);
	$(".apb").mouseenter(resetBtns);
}

function resetBtns() {
	for (var i = 0; i < pool.length; i++) {
		pool[i].abort();
	}
	flag = true;
	$(".button > span").html("").attr("class", "nothing");
	$(".button").removeClass("disable");
	$(".info").addClass("disable");
	$(".sum").html("");
}

function getRandomFromServer() {
	var obj = this;
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		var p = $.get("num","",function(data, state){
			if (state == "success") {
				var n = obj.className.substr(7,1).toUpperCase();
				var num = data.toString();
				$("." + n + " > span").html(num);
				if ($(".num").length == 5) {
					$(".info").removeClass("disable");
					$(".sum").html("");
					sumflag = true;
				}
			} else {
				$("." + n + " > span").html("!");
			}
			$(obj).siblings().removeClass("disable");
			flag = true;
		});
		pool.push(p);
	}
}

function getSum() {
	if ($(".num").length == 5&&sumflag) {
		var sum = 0;
		$(".num").each(function(i, e){
			sum += parseInt($(e).html());
		});
		$(".sum").html(sum);
		$(".info").addClass("disable");
		sumflag = false;
		$(".button").removeClass("disable");
	}
}
