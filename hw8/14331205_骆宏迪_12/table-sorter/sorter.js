
$(document).ready(function(){
	$("thead > tr > th").append("<span id=\"icon\"></span>");
	$("thead > tr > th").click(trClick);
});

function trClick() {
	changeIcon(this);
	tsort(this, $(this).index());
}

function changeIcon(obj) {
	$(obj).siblings(".sele").removeClass();
	if ($(obj).attr("class") != "sele") {
		$(obj).attr("class", "sele");
		$(obj).children("span").attr("class", "up")
	} else {
		if ($(obj).children("span").attr("class") == "up") {
			$(obj).children("span").attr("class", "down");
		} else {
			$(obj).children("span").attr("class", "up");
		}
	}
}

function tsort(obj, i) {
	var b = new Array()
	var ms = $(obj).closest("table").children("tbody").html()
	$(ms).each(function(index, element) {
		b[index] = $(this).html();
	})
	b = _.compact(b);
	b = _.sortBy(b, function(n){
		var sss = _.remove($(n), function(n){
			return n.nodeName == "TD";
		});
		var ans = sss[i].innerHTML;
		return isNaN(Number(ans))?ans:Number(ans);
	});
	if ($(obj).children("span").attr("class") == "down") {
		b.reverse();
	}
	$(obj).closest("table").children("tbody").children("tr").each(function(index, element) {
		$(element).html(b[index]);
	})
}
