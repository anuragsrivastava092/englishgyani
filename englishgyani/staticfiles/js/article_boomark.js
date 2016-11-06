$(document).ready(function () {
	bookmark_alert_div='<div class="alert alert-success fade in" id="alert_bookmark"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong id="bookmark_result">Success!</strong> <span id="bookmark_result_message">Word Bookmarked &nbsp;</span></div>';
	  
	//js-article
	$('#js-article').mouseup(function (e) {
		e.preventDefault();
		$("#alert_bookmark").hide();
		$("#tooltip_bookmark").hide();
		$("#tooltip_lookup").hide();
		$("#popup2").hide();
		selected_area = window.getSelection();
		selected_text = selected_area.toString();
		oRange = selected_area.getRangeAt(0); 
		oRect = oRange.getBoundingClientRect();
		console.log(2223);
		if (selected_text.length>1){ //bases on device
			x = oRect.right +  window.pageXOffset+ 'px';
			y = oRect.top -10 + window.pageYOffset+ 'px';
			lef = oRect.left -100  + window.pageXOffset+ 'px';
			bottom = oRect.bottom + 10 + window.pageYOffset+ 'px';
			$("#tooltip_lookup").show();
			placeTooltip_lookup(x, y);
			$("#tooltip_bookmark").show();
			placeTooltip_bookmark(lef, y);
		}
	 
	 });

     function placeTooltip_lookup(x_pos, y_pos) {
		var d = document.getElementById('tooltip_lookup');
		d.style.position = "absolute";
		d.style.left = x_pos;
		d.style.top = y_pos;
	}
	 function placeTooltip_bookmark(x_posi, y_posi) {
		 var dd = document.getElementById('tooltip_bookmark');
		dd.style.position = "absolute";
		dd.style.left = x_posi;
		dd.style.top = y_posi;
	}
	 function placeAlert(x_posi, y_posi) {
		var dd = document.getElementById('alert_bookmark');
		dd.style.position = "absolute";
		dd.style.left = x_posi;
		dd.style.top = y_posi;
	}
	 function placePopup(x_pos, y_pos) {
		var d = document.getElementById('popup2');
		d.style.position = "absolute";
		d.style.left = x_pos;
		d.style.top = y_pos;
	}
	
	 	$("#tooltip_bookmark").click(function(){
			fail = 1;
			$("body").append(bookmark_alert_div);
			console.log(11);
			$("#alert_bookmark").show();
			placeAlert(lef, y);
			if(fail===1){
				$("#alert_bookmark").attr("class", "alert alert-danger fade in");
				$("#bookmark_result").text("Failed!");
				$("#bookmark_result_message").text("Not Bookmarked");
			}
			else{
				$("#alert_bookmark").attr("class", "alert alert-success fade in");
				$("#bookmark_result").text("Success!");
				$("#bookmark_result_message").text("Word Bookmarked");
			}
			$("#tooltip_bookmark").hide();
			$("#tooltip_lookup").hide();
		
	});	
	$("#tooltip_lookup").click(function(){
	

			responsereply ="If you are sure that something is true, you are ceIf you are sure that something is true, you are certain that it is true. If you are not sure about something, you do not know for certain what the true situation is.rtain that it is true. If you are not sure about something, you do not know for certain what the true situation is.";
              placePopup(lef, bottom);
              $("#popup2").show();
				$("#alert_bookmark").hide();
				$("#tooltip_bookmark").hide();
				$("#tooltip_lookup").hide();

 });
	$("#english_ele").click(function(){
			$("#hindi_content").css({"display": "none"});
			$("#english_content").css({"display": "block"});
			$(".me_foot_basic_le").css("background-color", "#e2461d");
			$(".me_foot_basic_le").css("color", "white");
			$(".me_foot_basic_ri").css("background-color", "white");
			$(".me_foot_basic_ri").css("color", "#e2461d");
	});
	$("#hindi_ele").click(function(){
		$("#hindi_content").css({"display": "block"});
		$("#english_content").css({"display": "none"});
		$(".me_foot_basic_ri").css("background-color", "#e2461d");
		$(".me_foot_basic_ri").css("color", "white");
		$(".me_foot_basic_le").css("background-color", "white");
		$(".me_foot_basic_le").css("color", "#e2461d");
	});
	$(".popup_close_butt_cl").click(function(){
		$("#popup2").hide();
		
		
	});	

});