$(document).ready(function(){
	attachEvents();
});

function attachEvents() {
    $("#reset").click(resetData);
    $("#sign").click(jumpToSignPage);
    $("#regform").submit(submitData);
}

function resetData() {
	$("[type='text']").prop("value", "");
    $("[type='password']").prop("value", "");
    $("#error").html("")
}

function jumpToSignPage() {
    window.location.href = "regist"
}

function submitData() {
	if ($("#uname").val() != ''&&$("#unum").val() != '') {
        $("#uname").prop("value", $("#uname").val());
		$("#unum").prop("value", $("#unum").val());
		return true;
	} else {
		alert("你还有没按要求填的项。");
		return false;
	}
}