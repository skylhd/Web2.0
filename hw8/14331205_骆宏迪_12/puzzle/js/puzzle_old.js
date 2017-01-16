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
	for (var i = 0; i < 15; i++) {
		var btn = document.createElement("input");
		btn.type = "button";
		var r = Math.floor(i/4);
		var c = i%4;
		btn.setAttribute("class", "btn " + "r" + r + " c" + c);
		btn.setAttribute("id", "btn"+i);
		btn.addEventListener("click", BtnClick);
		document.getElementById("puzzle").appendChild(btn);
	}
}

function BtnClick() {
	if (isplaying) {
		var r = parseInt(this.getAttribute("class").substr(-4, 1));
		var c = parseInt(this.getAttribute("class").substr(-1));
		var cr = Math.floor(space/4);
		var cc = space%4;
		if ((cr == r &&Math.abs(cc - c) == 1)|| (cc == c && Math.abs(cr - r) == 1)) {
			this.setAttribute("class", "btn " + "r" + cr + " c" + cc);
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
		var r = parseInt(this.getAttribute("class").substr(-4, 1));
		var c = parseInt(this.getAttribute("class").substr(-1));
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
		document.getElementById("btn" + num).click();
	}
	isreseting = false;
	steps = 0;
}
