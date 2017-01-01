$(document).ready(function(){
	question_data=' <div class="question"> <div class="question_head"> <div class="question_head_le"> <span class="point_span"></span> <span class= "type_inst"></span> </div> <div class="question_head_ri"> <i aria-hidden="true" class="fa fa-times question_close"></i> </div> </div> <div class="question_body"> <h4 class="question_body_text"><span id= "question_text_int"></span><br> <br> <span id="question_text_main"></span> </h4> <div class="question_answer"> <div class="answer"> <label class="label_class" id="label_id0"><input id="answer-0" name= "answer" type="radio" value="0"><label for= "answer-0"></label> <span class="label_option" id= "label0_text"></span></label><br> <label class="label_class" id="label_id1"><input id="answer-1" name= "answer" type="radio" value="1"><label for= "answer-1"></label> <span class="label_option" id= "label1_text"></span></label><br> <label class="label_class" id="label_id2"><input id="answer-2" name= "answer" type="radio" value="2"><label for= "answer-2"></label> <span class="label_option" id= "label2_text"></span></label><br> <label class="label_class" id="label_id3"><input id="answer-3" name= "answer" type="radio" value="3"> <label for= "answer-3"></label> <span class="label_option" id= "label3_text"></span></label> </div> <div class="answer_ri"> <div class="ans_div"> <p class="answer_feeback"></p> </div> </div> </div> <div class="answer-footer"> <span class="button check_buttton" id="cont_check">Check</span><span class= "button question_close" id="cont_red">Continue Reading</span><span class= "button" id="next_exe">or Go to Next Exercise</span> </div> </div> </div>';
		$('title').text("Englishgyani - "+ article_content[0].title);
		$("#article_date").text(article_content[0].date);
		$(".article_head_text").text(article_content[0].title);
		$("#article_image").attr("src","/static/images/article_images/"+article_content[0].article_image+"/");
		//$("#article_head_second_head").text(article_content[0].title);//
		$("#js-article").append(article_content[0].article);
		$(".article_footer_time").append(article_content[0].publish_detail);
		$(".article_tag").text(article_content[0].article_tag);
		$(".article_level_detail").text(article_content[0].article_level_detail);
		$(".article_level_no").text(article_content[0].article_level);
		$(".list_obj1").text(article_content[0].article_objective1);
		$(".list_obj2").text(article_content[0].article_objective2);

	

	same_question=0; 
	previous_question_id =0;
		
		//$("body").on("click",".exercise-link",function(){ 
			$("body").on("click","link",function(){
			present = this;
			question_id= $(present).attr("id");
			console.log(question_id +"id");
			//same_question
			
			if (previous_question_id === question_id && same_question===1){
				$(".question").remove();
				same_question=0;
			}
			else{
				$(".question").remove();
				present_p_id= $(present).parent().attr("id");
				$("#"+present_p_id).after(question_data);
				question_index = findindex(article_question, question_id);
				console.log(question_index);
				// question
				$(".point_span").text(article_question[question_index].point +" points");
				$(".type_inst").text(article_question[question_index].question_instruction);
				$("#question_text_int").text(article_question[question_index].question_text);
				$("#question_text_main").text(article_question[question_index].question_description_main);
				$("#label0_text").text(article_question[question_index].option1);
				$("#label1_text").text(article_question[question_index].option2);
				$("#label2_text").text(article_question[question_index].option3);
				$("#label3_text").text(article_question[question_index].option4);
				//check_buttton
				$("input:radio").change(function () {
					$("#cont_check").prop("disabled", false);
					$(".check_buttton").css({"cursor":"pointer"});
					$(".check_buttton").css({"background":"#4CAF50"});
					$(".check_buttton").attr("class", "button check_buttton submit_response");
					//#a5d7a7
				});
				same_question=1;
				// attempted question
				attempted_que_index = findindex(question_attempt, question_id);
				if(attempted_que_index!=-1) {
						if (question_attempt[attempted_que_index].attempted_answer===question_attempt[attempted_que_index].correct_answer){
							$("#label_id"+question_attempt[attempted_que_index].attempted_answer).css({"background":"#7db956"});
							$("#answer-"+question_attempt[attempted_que_index].attempted_answer).attr("checked", true);
						}
						else{
							$("#label_id" + question_attempt[attempted_que_index].attempted_answer).css({"background":"#f7646c"});
							$("#answer-"+question_attempt[attempted_que_index].attempted_answer).attr("checked", true);
							$("#label_id"+question_attempt[attempted_que_index].correct_answer).css({"background":"#7db956"});
							
						}
						$(".answer_ri").css({"display":"block"});
						$(".answer_feeback").text(question_attempt[attempted_que_index].answer_feeback);
						$("#cont_check").css({"display":"none"});
						$("#cont_red").css({"display":"block"});
					
					
				}
				
				
			}
			
		//
		
			previous_question_id = question_id;
		});	
	$("body").on("click",".question_close",function(){ 
		$(".question").remove();
		same_question=0;
	
	});	
		
	//$("body").on("click",".submit_response",function(){ 
		$("body").on("click","sub",function(){ 
		present = this;
		console.log(present);
		response_ans = $('input[name="answer"]:checked').val();
		formdata=new FormData();
    		formdata.append("question_id",previous_question_id);
    		formdata.append("response",response_ans);
			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/article_question_response/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) { 
					que_response = response;
                   correct_answer=(que_response[0].right_choice-1).toString();
                   answer_feeback=que_response[0].feedback;
                   console.log(99);
	                if (response_ans===correct_answer){
						$("#label_id"+response_ans).css({"background":"#7db956"});
						}
					else{
						$("#label_id"+response_ans).css({"background":"#f7646c"});
						$("#label_id"+correct_answer).css({"background":"#7db956"});
					}
					$(".answer_ri").css({"display":"block"});
					$(".answer_feeback").text(answer_feeback);
					$("#cont_check").css({"display":"none"});
					$("#cont_red").css({"display":"block"});
					attempt_json={};
						attempt_json.id=question_id;
						attempt_json.answer_feeback=answer_feeback;
						attempt_json.correct_answer=correct_answer;
						attempt_json.attempted_answer=response_ans;
						question_attempt.push(attempt_json);
						},
				error: function(xhr) {
                     console.log(88);
				}
			});
		
		
	});
	
	$("body").on("click",".phrase-link",function(){
		console.log("edsdsfsd");
        $("#myphrase").modal();
		var present = this;
		var phrase_id= $(present).attr("id");
		var phrase_index = findindex(article_phrase, phrase_id);
		$("#phrase_text_id").text(article_phrase[phrase_index].phrase);
		$("#phrase_meaning_id").text(article_phrase[phrase_index].meaning);
		$("#phrase_example_id").text(article_phrase[phrase_index].example);
    });
	//
	$("#int_checkbox").click(function(){
		 exercise_check_li = $('input[name="int_checkbox"]:checked');
		if(exercise_check_li.length===1) {
			
		 $(".vocab_no").attr("class", "exercise-link vocabulary");
		 $(".grammar_no").attr("class", "exercise-link grammar");
		 $(".comprehension_no").attr("class", "exercise-link comprehension");
		}
		else{
			$(".vocabulary").attr("class", "vocab_no");
			$(".grammar").attr("class", "grammar_no");
			$(".comprehension").attr("class", "comprehension_no");
		}
    });
	//
	$("#int_phrases").click(function(){
		var phrase_check_li = $('input[name="int_phrases"]:checked');
		if (phrase_check_li.length===1) {
		 $(".phrase").attr("class", "phrase-link");
		}
		else{
			 $(".phrase-link").attr("class", "phrase");
		}
    });

		
	
});