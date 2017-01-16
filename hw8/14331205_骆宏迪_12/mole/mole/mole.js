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
	$("#time").prop("value", time);
	if (time > 0) {
		t = setTimeout("settimer()", 1000);
	} else {
		gameOver();
	}
}

function gameOver() {
	clearTimeout(t);
	$("#gameover").prop("value", "Game Over");
	alert("Game Over.\n" + "Your score is: " + score);
	isplaying = false;
	current = -1;
	ChooseOne(-1);
}

function attachEvents() {
	$("#start-button").click(startGame);
}

function resetTimeScore() {
	time = 30;
	score = 0;
	$("#score").prop("value", score);
	$("#time").prop("value", time);
}

function startGame() {
	if (isplaying) {
		gameOver();
	} else {
		resetTimeScore();
		t = setTimeout("settimer()", 1000);
		isplaying = true;
		if (current == -1) {
			ChooseOne(parseInt(Math.random()*60))
		}
		$("#gameover").prop("value", "Playing");
	}
}

function addButtons() {
	_.times(60, function(n){
		var str = "<input type=\"radio\" class=\"btn\" num=\"" + n + "\">"
		$("#buttons").append(str)
	})
	$(".btn").each(function(){
		$(this).click(function() {
			clickBtn(this);
		})
	})
}

function ChooseOne(n) {
	$(".btn").each(function(index, element) {
		if (index == n) {
			element.checked = true;
		}
		else element.checked = false;
	})
	current = n;
}

function clickBtn(obj) {
	if (isplaying) {
		if (obj.getAttribute("num") == current) {
			score++;
			ChooseOne(parseInt(Math.random()*60))
		} else {
			score--;
			obj.checked = false;
		}
		$("#score").prop("value", score);
	} else {
		obj.checked = false;
	}
}
