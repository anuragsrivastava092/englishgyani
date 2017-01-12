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

	
	// record start time
	startTime = new Date();
	setTimeout(display, 1000);
	var startTime;

function display() {
    // later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - startTime;

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff;

    $(".time").text("Time elasped: "+minutes +" minutes"+ " and " + seconds+" seconds");
    setTimeout(display, 1000);
	}

});