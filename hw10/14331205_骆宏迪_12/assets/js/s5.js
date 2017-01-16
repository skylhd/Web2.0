function s5() {
	$(".apb").click(function(){
		resetBtns();
		var array = [aHandler,bHandler,cHandler,dHandler,eHandler];
		array.sort(function(){
			return 0.5-Math.random();
		})
		array[0](array, 0, 0);
	});
}

function callback() {
	
}

function aHandler(arr, i, curSum) {
	var obj = $(".A");
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$(".A > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					$(".sum").html("这是个天大的秘密");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler();
				}
			} else {
				callback();
			}
		});
	}
}

function bHandler(arr, i, curSum) {
	var obj = $(".B");
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$(".B > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					$(".sum").html("我不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler();
				}
			}
		});
	}
}

function cHandler(arr, i, curSum) {
	var obj = $(".C");
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$(".C > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					$(".sum").html("你不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler();
				}
			}
		});
	}
}

function dHandler(arr, i, curSum) {
	var obj = $(".D");
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$(".D > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					$(".sum").html("他不知道");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler();
				}
			}
		});
	}
}

function eHandler(arr, i, curSum) {
	var obj = $(".E");
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$(".E > span").html(num);
				curSum += parseInt(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					$(".sum").html("才怪");
					arr[i+1](arr, i+1, curSum);
				} else {
					bubbleHandler(curSum);
				}
			}
		});
	}
}

function bubbleHandler(sum) {
	if ($(".num").length == 5) {
		$(".sum").html("楼主异步调用战斗力感人，目测不超过" + sum);
		$(".info").addClass("disable");
	}
}
