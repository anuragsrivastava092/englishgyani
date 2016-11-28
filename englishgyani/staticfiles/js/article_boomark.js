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
		//console.log(2223);
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
	function word_meaning_append(hindi_li, english_li) {
		$("#word_meaning").text(selected_text);
		//word_meaning_ans , english_content, hindi_content
		$('#hindi_content .word_meaning_ans').remove();
		$('#english_content .word_meaning_ans').remove();
		//$("#hindi_content")
		if (hindi_li.length===0){
			var first_h3 = document.createElement("h3"); 
			$(first_h3).addClass("word_meaning_ans");
			$(first_h3).text("Meaning not found");
			$("#hindi_content").append(first_h3);
		}
		if (english_li.length===0){
			var first_h3 = document.createElement("h3"); 
			$(first_h3).addClass("word_meaning_ans");
			$(first_h3).text("Meaning not found");
			$("#english_content").append(first_h3);
		}
		for (i=0;i<hindi_li.length;i++){
			var first_h3 = document.createElement("h3"); 
			$(first_h3).addClass("word_meaning_ans");
			$(first_h3).text(hindi_li[i]);
			//content_span.appendChild(font_cont);
			$("#hindi_content").append(first_h3);
		}
		for (j=0;j<english_li.length;j++){
			var first_h3 = document.createElement("h3"); 
			$(first_h3).addClass("word_meaning_ans");
			$(first_h3).text(english_li[j]);
			$("#english_content").append(first_h3);
		}
	}
	function word_meaning_api(word){
		formdata=new FormData();
		formdata.append("word",word);


			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/article_word_meaning_list/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) {
                    //article_json = jQuery.parseJSON( response );
                    word_meaning_list= response;
                    console.log(response);
                    hindi_object = word_meaning_list[0];
                    english_object = word_meaning_list[1];
                    hindi_object_li=[];
                    english_object_li=[];
                    for (i=0;i<hindi_object.length;i++){
                    	hindi_object_li.push(hindi_object[i].word_meaning)

                    }
                    for (j=0;j<english_object.length;j++){
                    	english_object_li.push(english_object[j].word_meaning)

                    }
                    wait(5000);
					result = [];
					result.push(hindi_object_li);
					result.push(english_object_li);
					return result;
				},
				error: function(xhr) {
                     console.log(88);
                     hindi_object_li=[];
                    english_object_li=[];
                    return [[],[]];
				}
			});
			
	}
	function word_bookmark_api(word){
		formdata=new FormData();
		formdata.append("word",word);
			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/article_bookmark/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) {
					aaa= parseInt(response);
                   //return 1;
				},
				error: function(xhr) {
					aaa=-3;
                    //return -1;
				}
			});
			
	}
	function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
}
	 	$("#tooltip_bookmark").click(function(){
			//fail = 1;
			$("body").append(bookmark_alert_div);
			//console.log(selected_text);
			$("#alert_bookmark").show();
			placeAlert(lef, y);
			if(user_name.length ===0){
				$("#alert_bookmark").attr("class", "alert alert-danger fade in");
				$("#bookmark_result").text("Failed!");
				$("#bookmark_result_message").text("Login to bookmark word");

			}
			else{
				word_bookmark_api(selected_text);
				//console.log(book_response);
				 wait(3000);
				if(aaa===1){
					$("#alert_bookmark").attr("class", "alert alert-success fade in");
					$("#bookmark_result").text("Success!");
					$("#bookmark_result_message").text("Word Bookmarked");
				}
				else if(aaa===0) {
	
					$("#alert_bookmark").attr("class", "alert alert-danger fade in");
					$("#bookmark_result").text("Failed!");
					$("#bookmark_result_message").text("Word already bookmarked");
				}
				else if(aaa===-1) {
	
					$("#alert_bookmark").attr("class", "alert alert-danger fade in");
					$("#bookmark_result").text("Failed!");
					$("#bookmark_result_message").text("Word meaning is not found");
				}
				else if(aaa===-2) {
	
					$("#alert_bookmark").attr("class", "alert alert-danger fade in");
					$("#bookmark_result").text("Failed!");
					$("#bookmark_result_message").text("Login to bookmark word");
				}
				else{
	
					$("#alert_bookmark").attr("class", "alert alert-danger fade in");
					$("#bookmark_result").text("Failed!");
					$("#bookmark_result_message").text("Bookmarked failed");
				}
			
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
				console.log(selected_text);
				aa = word_meaning_api(selected_text);
				wait(1000);
				console.log(1);
				console.log(aa);
				word_meaning_append(hindi_object_li,english_object_li);

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
