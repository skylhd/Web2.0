var isnew = true;
var str = "";

function numberClick(id)
{
	if (isnew) {
		str = id.innerHTML;
		isnew = false;
	} else {
		str += id.innerHTML;
	}
	document.getElementById("output-text").innerHTML = str;
}

function symbolClick(id) {
	str += id.innerHTML;
	document.getElementById("output-text").innerHTML = str;
	isnew = false;
}

function BackClick() {
	var s = str.substring(0, str.length - 1);
	str = s;
	document.getElementById("output-text").innerHTML = str;
}

function CEClick()
{
	document.getElementById("output-text").innerHTML = "";
	str = "";
	isnew = true;
}

function EqualClick()
{
	try
	{
		var text = document.getElementById("output-text").innerHTML;
		var a = eval(str);
		if (!isNaN(a)) {
			document.getElementById("log").innerHTML = str + " = " + a + "</br>" + document.getElementById("log").innerHTML;
			str = a;
			document.getElementById("output-text").innerHTML = str;
			isnew = true;
			
		} else {
			
		}
	} catch (e) {
		alert("You have entered an uncorrect equation!");
	}
	
}