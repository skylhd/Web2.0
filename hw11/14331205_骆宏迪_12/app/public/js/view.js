$(document).ready(function(){
	attachEvents();
});

function attachEvents() {
    $("#reset").click(resetData);
    $("#sign").click(jumpToSignPage);
    $("#regform").submit(submitData);
}
