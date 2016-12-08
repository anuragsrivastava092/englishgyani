$(document).ready(function(){
		$('title').text("Englishgyani - "+ article_content[0].title);
		$("#article_date").text(article_content[0].date);
		$(".article_head_text").text(article_content[0].title);
		$("#article_image").attr("src","/static/images/article_images/"+article_content[0].article_image+"/");
		$("#article_head_second_head").text(article_content[0].title);//
		$("#js-article").append(article_content[0].article);
		$(".article_footer_time").append(article_content[0].publish_detail);
		$(".article_tag").text(article_content[0].article_tag);
		$(".article_level_detail").text(article_content[0].article_level_detail);
		$(".article_level_no").text(article_content[0].article_level);
		$(".list_obj1").text(article_content[0].article_objective1);
		$(".list_obj2").text(article_content[0].article_objective2);
		//
		$(".question_no_error").text(play_content[0].errorcount);
		//
		change=0;
		popup_arr=[];
		popup_arr_corr=[];
		popup_arr_word=[];
		popup_arr_word_wr=[];
		send_arr_Pos=[];
		outer_width = window.outerWidth;
		

	//change in editable
	if (question_attempt[0].attempted_text.length ===0) {
			display_content(play_content[0].alteredtext)
	}
	else {
			display_content(question_attempt[0].attempted_text);
			submit();
			change=question_attempt[0].change;
			$(".edit_no").text(change);
			multi_factor = 100/(play_content[0].errorcount);
			var progress_percent = change*multi_factor;
			if (progress_percent<=100){
				$(".progress-bar").css("width",progress_percent+"%");
				$(".only").text(progress_percent+"%"+" "+"Complete");
			}
			else{
				$(".progress-bar").css("width",100+"%");
				$(".only").text(progress_percent+"%"+" "+"Complete");

			}
	}
	//
	 $( '.question' ).on( 'input', '.editable', function () { 
	
		current=this;
		span_id=$(current).attr("id");
		span_id_int = parseInt(span_id);
		span_original_text=alter_word_object[span_id_int];
		console.log(span_original_text);
		span_modif_text =$(current).text();
		if ( (span_original_text!==span_modif_text)  && (change_progress[span_id_int] ===0)) {
		change+=1;
		change_progress[span_id_int] =1;
		$(current).css("font-weight","bold");
		}
		else if ( (span_original_text===span_modif_text)  && (change_progress[span_id_int] ===1)) {
			change-=1;
			change_progress[span_id_int] =0;
			$(current).css("font-weight","normal");
		}

		$(".edit_no").text(change);
		multi_factor = 100/(play_content[0].errorcount);
		var progress_percent = change*multi_factor;
		if (progress_percent<=100){
			$(".progress-bar").css("width",progress_percent+"%");
			$(".only").text(progress_percent+"%"+" "+"Complete");
		}
		else{
			$(".progress-bar").css("width",100+"%");
			$(".only").text(progress_percent+"%"+" "+"Complete");

		}

 });
	//reset 
	$(".reset").click(function(){
		$(".question").empty();
		
		display_content();
		change=0;
		$(".edit_no").text(change);
		multi_factor = 100/(play_content[0].errorcount);
		var progress_percent = change*multi_factor;
		//	var progress_percent = change*10;
		$(".progress-bar").css("width",progress_percent+"%");
		$(".only").text(progress_percent+"%"+" "+"Complete");
 	
	});
	// stop cut, copy, paste, space, enter
	$('.question').bind("cut copy paste",function(e) {
  		e.preventDefault();
 	});
	$('.question').keydown( function(e) {
		
	    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	    if(key === 13 || key === 32) {
			e.preventDefault();
	        return false;
	    }
	});

});

	$(".submit_button_pp").click(function(e){
			submit();
			send_user_response(modified_text,article_content[0].id,popup_arr.length)
	});
	//
	current_feed_pos=1;
$(".feed_move_button_front").click(function(e){
	e.preventDefault();
	x = popup_arr[current_feed_pos];
	x_old = popup_arr[current_feed_pos-1];
	x_p=$("#"+x).position();
	$("#"+x_old).css("font-style","normal");
	$("#"+x).css("font-weight","normal");
	$("#"+x).css("font-style","oblique");
	$("#"+x).css("font-weight","bold");
	x_t=popup_arr_corr[current_feed_pos];
	x_word=popup_arr_word[current_feed_pos];
	corr_wo=popup_arr_word_wr[current_feed_pos];
	
	corr_word=topic_feed[corr_wo];
	placeTooltip(x_p.left,x_p.top,x_t,x_word,current_feed_pos,corr_word,corr_feed_len);
	current_feed_pos+=1;
	
	
	});

$(".feed_move_button_back").click(function(e){
	e.preventDefault();
	current_feed_pos-=1;
	x = popup_arr[current_feed_pos];
	x_old = popup_arr[current_feed_pos-1];
	x_p=$("#"+x).position();
	$("#"+x_old).css("font-style","normal");
	$("#"+x).css("font-weight","normal");
	$("#"+x).css("font-style","oblique");
	$("#"+x).css("font-weight","bold");
	x_t=popup_arr_corr[current_feed_pos];
	x_word=popup_arr_word[current_feed_pos];
	corr_wo=popup_arr_word_wr[current_feed_pos];
	
	corr_word=topic_feed[corr_wo];
	placeTooltip(x_p.left,x_p.top,x_t,x_word,current_feed_pos,corr_word,corr_feed_len);
	
	
	
	});

	function display_content(display_arr) {
			//ques_par_no= play_content[0].alteredtext.length;
			question_arr=play_content[0].alteredtext;
			par_no=display_arr.length;
			change_progress=[];
			alter_word_object = {};
			correct_word_object = {};
			word_no=0;
			for (i=0;i<par_no;i++) {
				paragraph_content=display_arr[i];
				question_content=question_arr[i];
				paragraph_array = paragraph_content.split(" ");
				question_content_array= question_content.split(" ");
				correct_paragraph_content=play_content[0].originaltext[i]
				correct_paragraph_array = correct_paragraph_content.split(" ");

				len = paragraph_array.length;
				var paragraph_ele = document.createElement("p"); 
						$(paragraph_ele).attr("id", "par"+i);
						
					for (j=0;j<len;j++) {
						change_progress.push(0);
						var first_span = document.createElement("span"); 
							$(first_span).addClass("editable");
							$(first_span).attr("id", j+word_no);
							$(first_span).attr("contenteditable", "true");
							$(first_span).text(paragraph_array[j]);
							word_obj_no = (j+word_no).toString();
							
							alter_word_object[word_obj_no]=question_content_array[j];
							correct_word_object[word_obj_no]=correct_paragraph_array[j];
							$(paragraph_ele).append(first_span);
						var second_span = document.createElement("span"); 
							$(second_span).addClass("space non_editable");
							$(second_span).attr("id", j+10000+word_no);
							$(second_span).attr("contenteditable", "false");
							$(second_span).text(" ");
							$(paragraph_ele).append(second_span);

					}
					send_arr_Pos.push(word_obj_no);
					word_no=word_no+len;
					$(".question").append(paragraph_ele);

			}
	}
	function submit() {
		// body...
		edit_correct=0;
		modified_text="";
		$(".submit_button_pp").hide();
		$(".reset").hide();
		correct_len=countProperties(alter_word_object);
		console.log(correct_len);
		for (i=0;i<correct_len;i++){
			span_original_text=alter_word_object[i];
			span_original_correct_text=correct_word_object[i];
			span_modif_text =$("#"+i).text();
			modified_text+=span_modif_text+" ";

			paragraph_number = send_arr_Pos.indexOf(i.toString());
			if (paragraph_number!=-1) {
				modified_text+="|"+" ";
			}
			else{
				tt=0;
			}

			$("#"+i).attr('contenteditable', 'false');
			if( (span_original_text=== span_original_correct_text) && (span_original_correct_text===span_modif_text)) {
					aaa=0; //no change
			}
			else if ( (span_original_text=== span_original_correct_text ) && (span_original_correct_text!==span_modif_text) ){//no need of changes, wrong change
					$("#"+i).css("background","#ff1919");//red  #7a2553
					$("#"+i).css("padding","5px");
					popup_arr.push(i);
					popup_arr_corr.push(0);
					popup_arr_word.push(span_original_correct_text);
					popup_arr_word_wr.push(span_original_text);

			}
			// modified and no identification
			else if ( (span_original_text!== span_original_correct_text ) && (span_original_text===span_modif_text) ){
				$("#"+i).css("background","#f7646c");//brown correct #c33c1c

				$("#"+i).css("padding","5px");
				popup_arr.push(i);
				popup_arr_corr.push(0);
				popup_arr_word.push(span_original_correct_text);
				popup_arr_word_wr.push(span_original_text);

			}
			// modified and corrected edit
			else if ( (span_original_text!== span_original_correct_text ) && (span_original_correct_text===span_modif_text) ){
				$("#"+i).css("background","#7db956");//green correct #a4c73c
				$("#"+i).css("padding","5px");
				edit_correct+=1;
				popup_arr.push(i);
				popup_arr_corr.push(1);
				popup_arr_word.push(span_original_correct_text);
				popup_arr_word_wr.push(span_original_text);

			}
			// modified and wrong edit 
			else if ( (span_original_text!== span_original_correct_text ) && (span_original_correct_text!==span_modif_text) && (span_original_text!==span_modif_text)){
				$("#"+i).css("background","#ff9999");
				$("#"+i).css("padding","5px");
				popup_arr.push(i);
				popup_arr_corr.push(0);
				popup_arr_word.push(span_original_correct_text);
				popup_arr_word_wr.push(span_original_text);
			}
		}
		console.log(modified_text);
 		$('.modal_result_text').text("You have corrected "+edit_correct+" error out of "+play_content[0].errorcount+".");
 		x = popup_arr[0];
		x_t=popup_arr_corr[0];
		x_word=popup_arr_word[0];
		x_p=$("#"+x).position();
		$("#"+x).css("font-style","oblique");
		$("#"+x).css("font-weight","bold");
		corr_wo=popup_arr_word_wr[0];
		corr_word=topic_feed[corr_wo];
		corr_feed_len = popup_arr.length-1;
		placeTooltip(x_p.left,x_p.top,x_t,x_word,0,corr_word,corr_feed_len);
 		//modified_text=modified_text.trim();
		//send_user_response(modified_text,article_content[0].title);
	}
	function placeTooltip(x_pos, y_pos,err_t,wor,edit_n,fed_wor,fed_wor_len) {
	//console.log(fed_wor);
    	var d = $(".feed_main");
	$(d).show();
	if (outer_width<450){
	$(d).css("left",10+"px");
	
	}
	else{
	$(d).css("left",x_pos+"px");
	}
	
	$(d).css("top",y_pos+40+"px");
	$(".feed_body_content2").text(wor);
	
	if (edit_n===0){
		$(".feed_move_back").hide();
		$(".feed_move_front_exe").hide();
		$(".feed_move_front").show();
	}
	else if (edit_n===fed_wor_len){
		$(".feed_move_front").hide();
		//$(".feed_move_front_exe").show();
	}
	else {
		$(".feed_move_back").show();
		$(".feed_move_front").show();
		$(".feed_move_front_exe").hide();
	}
	
	edit_n=edit_n+1;
	$(".head_text2").text("Edit "+edit_n+" of "+popup_arr.length);
	if (err_t===0){
		$("#head_icon1").attr('class', 'glyphicon glyphicon-remove head_icon_modal');
		$('.head_text1').text('Incorrect');
		$(".head_icon").css("color","#f6766d");
		
		
	}
	else {
		$("#head_icon1").attr('class', 'glyphicon glyphicon-ok head_icon_modal');
		$('.head_text1').text('Correct');
		$(".head_icon").css("color","#40441e");
	}
	
	if (fed_wor!==undefined){
		$('.feed_body_concept2').text(fed_wor);
	}
	else {
		$('.feed_body_concept2').text("No edit was needed!");
	}
	
	
    
 }

	function send_user_response(user_response,id,errorcount) {
	formdata=new FormData();
    		formdata.append("user_response",user_response);
    		formdata.append("id",id);
    		formdata.append("errorcount",errorcount);
			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/play_question_response/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) { 
					console.log(55);
						},
				error: function(xhr) {
                     console.log(88);
				}
			});
	};

	function countProperties (obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}