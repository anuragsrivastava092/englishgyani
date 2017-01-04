$(document).ready(function(){
	$(".navbar-nav li a").click(function(event) {
		$(".navbar-collapse").collapse('hide');
	  });
    //$("#eglogin").click(function(){
    	$("body").on("click","#eglogin",function(){ 
        $("#myModal").modal();
		$(".sign_text").text("Login to Englishgyani");
    });
/*	$("#egregister").click(function(){
		console.log("register");
        $("#myModal").modal();
		$(".sign_text").text("Register to Englishgyani");
    }); */
    $("body").on("click","#egregister",function(){ 
    	console.log("register");
        $("#myModal").modal();
		$(".sign_text").text("Register to Englishgyani");
    	});
   // user_name ="kk";
		if(user_name.length!=0){
			$(".profile_nav_icon").text(" "+user_name.slice(0,5));
			$(".log_nav_icon").text(" Logout");
			$("#egregister").attr("id", "eguser");
			$("#eglogin").attr("id", "egsignout");
			$("#egsignout").attr("href", "/logout/");
			 $("#user_leaderboard").show();

	}
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