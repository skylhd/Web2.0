var array = ["A", "B", "C", "D", "E"];
var complete = {
	"A":false,
	"B":false,
	"C":false,
	"D":false,
	"E":false
};
var pool = [];

$(document).ready(function(){
	attachEvents();
	s4();
});

function s4 () {
	$(".apb").click(function(){
		resetBtns();
		array.sort(function(){
			return 0.5-Math.random();
		})
		$(".sum").html(array.join(""));
		robot(array);
	});
}

function callbackt() {
	$(".info").click();
}

function run1(str, func) {
	$("." + str).click();
	interval = setInterval(function(){
		if (complete[str] == true) {
			clearInterval(interval);
			func();
		}
	}, 100);
}

function robot(arr) {
	run1(arr[0], function(err, p_a) {
		run1(arr[1], function(err, p_b){
			run1(arr[2], function(err, p_b){
				run1(arr[3], function(err, p_b){
					run1(arr[4], function(err, p_b){
						callbackt();
					});
				});
			});
		});
	});
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
	resetCBtn();
	$(".button > span").html("").attr("class", "nothing");
	$(".info").addClass("disable");
	$(".sum").html("");
}

function getRandomFromServer() {
	var obj = this;
	var n = obj.className.substr(7,1).toUpperCase();
	if (!($(obj).hasClass("disable"))) {
		$(obj).siblings().addClass("disable");
		$(obj).children("span").html("...").attr("class", "num");
		var p = $.get("num","",function(data, state){
			if (state == "success") {
				var num = data.toString();
				$("." + n + " > span").html(num);
				complete[n] = true;
				$(obj).addClass("disable");
				if ($(".num").length == 5) {
					$(".info").removeClass("disable");
					$(".sum").html("");
				}
			} else {
				$("." + n + " > span").html("!");
			}
			$(obj).siblings().each(function(i, e){
				var name = e.className.substr(7,1).toUpperCase();
				if (complete[name] == false) {
					$(e).removeClass("disable");
				}
			});
		});
		pool.push(p);
	}
}

function resetCBtn() {
	complete["A"] = false;
	complete["B"] = false;
	complete["C"] = false;
	complete["D"] = false;
	complete["E"] = false;
	$(".button").removeClass("disable");
}

function getSum() {
	if (!($(".info").hasClass("disable"))) {
		var sum = 0;
		$(".num").each(function(i, e){
			sum += parseInt($(e).html());
		});
		$(".sum").html(sum);
		$(".info").addClass("disable");
		resetCBtn();
	}
}

