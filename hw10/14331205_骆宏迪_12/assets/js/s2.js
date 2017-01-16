
function s2 () {
	$(".apb").click(function(){
		resetBtns();
		robot1("A");
	});
}

function robot1(str) {
	var obj = $("." + str);
	if (flag) {
		flag = false;
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		$.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$("." + str + " > span").html(num);
				$(obj).siblings().removeClass("disable");
				flag = true;
				switch(str) {
					case "A":robot1("B");
							 break;
					case "B":robot1("C");
							 break;
					case "C":robot1("D");
							 break;
					case "D":robot1("E");
							 break;
					case "E":$(".info").removeClass("disable");
							 $(".sum").html("");
							 sumflag = true;
							 $(".info").click();
							 break;
					default:
							 break;
				}
			}
		});
	}
}

