var space = 15;
var steps;
var isplaying;
var isreseting;

window.onload = function () {
	CreateBtns();
	steps = 0;
	isplaying = false;
	isreseting = false;
	document.getElementById("restart").addEventListener("click", Restart);
};

function CreateBtns() {
	_.times(15, function(n){
		var str = "<input type=\"button\" class=\"btn r"+Math.floor(n/4)+" c"+n%4+"\" id=\"btn" + n + "\">"
		$("#puzzle").append(str)
	})
	$(".btn").each(function(){
		$(this).click(BtnClick);
	})
}

function BtnClick() {
	if (isplaying) {
		var r = parseInt(this.getAttribute("class").substr(-4, 1));
		var c = parseInt(this.getAttribute("class").substr(-1));
		var cr = Math.floor(space/4);
		var cc = space%4;
		if ((cr == r &&Math.abs(cc - c) == 1)|| (cc == c && Math.abs(cr - r) == 1)) {
			$(this).attr("class", "btn " + "r" + cr + " c" + cc);
			space = r*4+c;
			if (!isreseting) {
				steps++;
				//检查是否胜利
				if (Checkiswin()) {
					alert("You Win.\n Steps: " + steps);
				}
			}
		}
	}
}

function Checkiswin() {
	var flag = true;
	$(".btn").each(function (index, element) {
		var r = parseInt($(this).attr("class").substr(-4, 1));
		var c = parseInt($(this).attr("class").substr(-1));
		var i = r*4+c;
		if (i != index) {
			flag = false;
			return false;
		}
	});
	return flag;
}

function Restart() {
	isplaying = true;
	isreseting = true;
	//模拟点击，1000步打散拼图
	for (var i = 0; i < 1000; i++) {
		var num = Math.floor(Math.random()*15);
		$("#btn" + num).click();
	}
	isreseting = false;
	steps = 0;
}
