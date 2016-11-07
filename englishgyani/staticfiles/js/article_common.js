$(document).ready(function(){
	$(".navbar-nav li a").click(function(event) {
		$(".navbar-collapse").collapse('hide');
	  });
    $("#eglogin").click(function(){
        $("#myModal").modal();
		$(".sign_text").text("Login to Englishgyani");
    });
	$("#egregister").click(function(){
        $("#myModal").modal();
		$(".sign_text").text("Register to Englishgyani");
    });
});