var score = 0;
var isplaying = false;
var t;
var time = 0;
var current = -1;

window.onload = function() {
	addButtons();
	attachEvents();
}

function settimer() {
	time--;
	document.getElementById("time").value = time;
	if (time > 0) {
		t = setTimeout("settimer()", 1000);
	} else {
		clearTimeout(t);
		document.getElementById("gameover").value = "Game Over";
		alert("Game Over.\n" + "Your score is: " + score);
		isplaying = false;
		current = -1;
	}
	
}

function attachEvents() {
	document.getElementById("start-button").addEventListener("click", startGame);
	
}

function startGame() {
	if (isplaying) {
		clearTimeout(t);
		isplaying = false;
		document.getElementById("gameover").value = "Pause";
	} else {
		if (time == 0) {
			time = 30;
			score = 0;
		}
		document.getElementById("score").value = score;
		document.getElementById("time").value = time;
		t = setTimeout("settimer()", 1000);
		isplaying = true;
		if (current == -1) {
			var bts = document.getElementsByClassName("btn");
			for (var i = 0; i < 60; i++) {
				bts[i].checked = false;
			}
			var x = parseInt(Math.random()*60);
			bts[x].checked = true;
			current = x;
		}
		document.getElementById("gameover").value = "Playing";
	}
}

function addButtons() {
	var bts = document.getElementById("buttons");
	for (var i = 0; i < 60; i++) {
		var btn = document.createElement("input");
		btn.type = "radio";
		btn.addEventListener("click", function() {
			clickBtn(this);
		});
		btn.setAttribute("class", "btn");
		btn.setAttribute("num", i);
		bts.appendChild(btn);
	}
}

function clickBtn(obj) {
	if (isplaying) {
		if (obj.getAttribute("num") == current) {
			score++;
		} else {
			score--;
		}
		document.getElementById("score").value = score;
		obj.checked = false;
		var bts = document.getElementsByClassName("btn");
		for (var i = 0; i < 60; i++) {
			bts[i].checked = false;
		}
		var x = parseInt(Math.random()*60);
		bts[x].checked = true;
		current = x;
	} else {
		if (time == 0) {
			obj.checked = false;
		} else {
			if (obj.getAttribute("num") != current) {
				obj.checked = false;
			}
		}
	}
}
