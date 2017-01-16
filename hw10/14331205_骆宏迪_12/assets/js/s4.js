var array = ["A", "B", "C", "D", "E"];


function s4 () {
	$(".apb").click(function(){
		resetBtns();
		array.sort(function(){
			return 0.5-Math.random();
		})
		robot3(0);
	});
}

function robot3(i) {
	var obj = $("." + array[i]);
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$("." + array[i] + " > span").html(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				if (i < 4) {
					robot3(i+1);
				} else {
					$(".info").removeClass("disable");
					$(".sum").html("");
					sumflag = true;
					$(".info").click();
				}
			}
		});
	}
}
