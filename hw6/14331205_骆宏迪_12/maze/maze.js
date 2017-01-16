var isplaying = false;
var ischeating = false;

window.onload = function () {
	attachEventListeners();
}

function attachEventListeners() {
	document.getElementById("start").addEventListener("mouseover", enterStart, false);
	document.getElementById("end").addEventListener("mouseover", enterEnd);
	document.getElementById("maze").addEventListener("mouseleave", outsideMaze);
	var walls = document.getElementsByClassName("wall");
	for(var i = 0; i < walls.length; i++) {
		if (walls[i].id != "simple") {
			walls[i].addEventListener("mouseover", function() {
				if (isplaying) {
					this.style.backgroundColor = "red";
					isplaying = false;
					document.getElementById("result").innerHTML = "You Lose";
				}
			});
		}
	}
}

function enterStart() {
	document.getElementById("maze").style.crusor = "pointer";
	document.getElementById("result").innerHTML = "";
	var walls = document.getElementsByClassName("wall");
	for(var i = 0; i < walls.length; i++) {
		walls[i].style.backgroundColor = "rgb(238,238,238)";
	}
	isplaying = true;
	ischeating = false;
}

function enterEnd() {
	if (isplaying) {
		if (!ischeating) {
			document.getElementById("result").innerHTML = "You Win";
		} else {
			document.getElementById("result").innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
		}
		isplaying = false;
	}
}

function outsideMaze() {
	ischeating = true;
}