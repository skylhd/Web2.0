var flag = true;
var sumflag = true;

$(document).ready(function(){
	attachEvents();
});

function attachEvents() {
	$(".button").click(getRandomFromServer);
	$(".info").click(getSum);
	$(".apb").mouseleave(resetBtns);
}

function resetBtns() {
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
		$.get("num","",function(data, state){
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
	}
}
