$(document).ready(function(){
	$('title').text("Englishgyani - "+ article_content[0].title);
		$("#article_date").text(article_content[0].date);
		$(".article_head_text").text(article_content[0].title);
		$("#video").attr("src",article_content[0].article_video)
		$(".article_level_detail").text(article_content[0].article_level_detail);
		$(".article_level_no").text(article_content[0].article_level);
		$(".list_obj1").text(article_content[0].article_objective1);
		$(".list_obj2").text(article_content[0].article_objective2);
		$("#question_category1").text(article_question[0].question_type);
		$("#question_category2").text(article_question[1].question_type);
		$("#question_category3").text(article_question[2].question_type);
		$("#question_category4").text(article_question[3].question_type);
		
			$("#timeline1").text(article_question[0].question_timing);
			$("#timeline2").text(article_question[1].question_timing);
			$("#timeline3").text(article_question[2].question_timing);
			$("#timeline4").text(article_question[3].question_timing);

				$(".point_span").text(article_question[0].point);
				$("#question_text_int").text(article_question[0].point);
				$("#question_text_int").text(article_question[0].question_text);
				$("#question_text_main").text(article_question[0].question_description_main);
				$("#label0_text").text(article_question[0].option1);
				$("#label1_text").text(article_question[0].option2);
				$("#label2_text").text(article_question[0].option3);
				$("#label3_text").text(article_question[0].option4);
				$("input:radio").change(function () {
					$(".check_buttton").prop("disabled", false);
					$(".check_buttton").css({"cursor":"pointer"});
					$(".check_buttton").css({"background":"#4CAF50"});
					$(".check_buttton").attr("class", "button check_buttton submit_response");
					//#a5d7a7
				});
				attempted_que_index = findindex(question_attempt, article_question[0].id);
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
						response_ans=question_attempt[attempted_que_index].attempted_answer;
						correct_answer=question_attempt[attempted_que_index].correct_answer;
						$(".answer_ri").css({"display":"block"});
						$(".answer_feeback").text(question_attempt[attempted_que_index].answer_feeback);
						$("#cont_check").css({"display":"none"});
						$("#next_que").css({"display":"block"});
					
					
				}
					current_ques_id=article_question[0].id;
					current_ques_tab=0;

	$("body").on("click",".submit_response",function(){ 
		response_ans = $('input[name="answer"]:checked').val().toString();
		//correct_answer = "0";
		//answer_feeback ='answer_feeback answer_feeback answer_feeback answer_feebackSorry, its the other way around. We add the prefix "un-" to mean "not" or "the opposite of" something.';
		
	               



				///
			formdata=new FormData();
    		formdata.append("question_id",article_question[current_ques_tab].id);
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
					$("#next_que").css({"display":"block"});
					attempt_json={};
						attempt_json.id=article_question[current_ques_tab].id;
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
	$("body").on("click",".question_close",function(){ 
		$(".question").hide();
		$("#tab"+current_ques_tab).attr("class", "panel panel-default ques_div");
		current_ques_tab=-1;
		
	});	
	$("body").on("click","#next_que",function(){ 
		$("#tab"+current_ques_tab).attr("class", "panel panel-default ques_div");
		if (current_ques_tab===3){
			current_ques_tab=0
		}
		else if(current_ques_tab===0){
			current_ques_tab=1
		}
		else if(current_ques_tab===1){
			current_ques_tab=2
		}
		else if(current_ques_tab===2){
			current_ques_tab=3
		}

		$("#tab"+current_ques_tab).attr("class", "panel panel-default ques_div ques1");
		$("#label_id"+response_ans).css({"background":"#f2f2f2"});
		$("#label_id"+correct_answer).css({"background":"#f2f2f2"});
		$("input:radio").attr("checked", false);
		$(".answer_ri").css({"display":"none"});

				$(".point_span").text(article_question[current_ques_tab].point +" points");
				$("#question_text_int").text(article_question[current_ques_tab].question_instruction);
				$("#question_text_main").text(article_question[current_ques_tab].question_text);
				$("#label0_text").text(article_question[current_ques_tab].option1);
				$("#label1_text").text(article_question[current_ques_tab].option2);
				$("#label2_text").text(article_question[current_ques_tab].option3);
				$("#label3_text").text(article_question[current_ques_tab].option4);
				//check_buttton
				$("#next_que").hide();
				$("#cont_check").show();
				
				attempted_que_index = findindex(question_attempt, article_question[current_ques_tab].id);
				if(attempted_que_index!=-1) {
						if (question_attempt[attempted_que_index].attempted_answer===question_attempt[attempted_que_index].correct_answer){
							$("#label_id"+question_attempt[attempted_que_index].attempted_answer).css({"background":"#7db956"});
							$("#answer-"+question_attempt[attempted_que_index].attempted_answer).prop("checked", true);
						}
						else{
							$("#label_id" + question_attempt[attempted_que_index].attempted_answer).css({"background":"#f7646c"});
							$("#answer-"+question_attempt[attempted_que_index].attempted_answer).prop("checked", true);
							console.log("#answer-"+question_attempt[attempted_que_index].attempted_answer);
							$("#label_id"+question_attempt[attempted_que_index].correct_answer).css({"background":"#7db956"});
							
						}
						response_ans=question_attempt[attempted_que_index].attempted_answer;
						correct_answer=question_attempt[attempted_que_index].correct_answer;
						
						$(".answer_ri").show();
						$(".answer_feeback").text(question_attempt[attempted_que_index].answer_feeback);
						$("#cont_check").hide();
						$("#next_que").show();
					
					
				}
				else{
					$("input:radio").change(function () {
					$("#cont_check").prop("disabled", false);
					$(".check_buttton").css({"cursor":"pointer"});
					$(".check_buttton").css({"background":"#4CAF50"});
					$(".check_buttton").attr("class", "button check_buttton submit_response");
					//#a5d7a7
					});
				}
	});	
	


function question_response(question_id,response_ans){
		formdata=new FormData();
		formdata.append("question_id",question_id);
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
                  
				},
				error: function(xhr) {
					aaa=-3;
                    //return -1;
				}
			});
			
}	

function findindex(q_json, id){ 
		for (i=0;i<q_json.length;i++){
				if (q_json[i].id === id){ 
					return i
				}
		}
		return -1
		
	};	

});
