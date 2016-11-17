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
    window.getCookie = function(name){
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
});