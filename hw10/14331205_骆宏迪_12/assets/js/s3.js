

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
	$.get("num","",function(data, state){
		if (state == "success") {
			var num = data.toString();
			$("." + str + " > span").html(num);
			$("." + str + " > span").addClass("complete");
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
}