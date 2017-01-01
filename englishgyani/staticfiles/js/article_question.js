$(document).ready(function(){
	$("#next_que").hide();
	//attempted_list=[];
	question_index=0;
	question='<div class="question"> <div class="question_head"><div class="question_head_le"> <span class="point_span">3 points</span> <span class="type_inst">Select the correct option carefully.</span></div> <div class="question_head_ri"> <i aria-hidden="true" class="fa fa-times question_close"></i> </div></div> <div class="question_body"> <h4 class="question_body_text"><span id="question_text_int">Which of these is necessary to be a good economist?</span><br> <br> <span id="question_text_main"></span> </h4> <div class="question_answer"> <div class="answer"> <label class="label_class" id="label_id0"> <input id="answer-0" name="answer" type="radio" value="0"> <label for="answer-0"></label> <span class="label_option" id="label0_text">interdisciplinary studies</span> </label> <br> <label class="label_class" id="label_id1"> <input id="answer-1" name="answer" type="radio" value="1"> <label for="answer-1"></label> <span class="label_option" id="label1_text">communication skills</span> </label> <br> <label class="label_class" id="label_id2"> <input id="answer-2" name="answer" type="radio" value="2"> <label for="answer-2"></label> <span class="label_option" id="label2_text">the study of branches of philosophy</span> </label> <br> <label class="label_class" id="label_id3"> <input id="answer-3" name="answer" type="radio" value="3"> <label for="answer-3"></label> <span class="label_option" id="label3_text">mathematical skills</span> </label> </div> <div class="answer_ri"> <div class="ans_div"> <p class="answer_feeback"></p> </div> </div> </div> <div class="answer-footer"> <span class="button check_buttton" id="cont_check">Check</span><span class="button next_question" id="next_que">Next Question</span> </div> </div> </div>';
	
		if(article_question.length===0){
					$("#col0").hide();
					$("#col1").hide();
					$("#col2").hide();
					$("#col3").hide();
					$("#col4").hide();
					$("#col5").hide();
					$(".question").hide();

			}
		else if(article_question.length>0){

			
				question_id=article_question[question_index].id;
				$(".point_span").text(article_question[question_index].point +"points");
				$("#question_text_int").text(article_question[question_index].question_instruction);
				$("#question_text_main").text(article_question[question_index].question_text);
				$("#label0_text").text(article_question[question_index].option1);
				$("#label1_text").text(article_question[question_index].option2);
				$("#label2_text").text(article_question[question_index].option3);
				$("#label3_text").text(article_question[question_index].option4);

				attempted_que_index = findindex(attempted_list, question_id);

				$("input:radio").change(function () {
					$("#cont_check").prop("disabled", false);
					$(".check_buttton").css({"cursor":"pointer"});
					$(".check_buttton").css({"background":"#4CAF50"});
					$(".check_buttton").attr("class", "button check_buttton submit_response");
					//#a5d7a7
				});

				if(attempted_que_index!=-1) {
						if (attempted_list[attempted_que_index].attempted_answer===attempted_list[attempted_que_index].correct_answer){
							$("#label_id"+attempted_list[attempted_que_index].attempted_answer).css({"background":"green"});
							$("#answer-"+attempted_list[attempted_que_index].attempted_answer).attr("checked", true);
						}
						else{
							$("#label_id" + attempted_list[attempted_que_index].attempted_answer).css({"background":"red"});
							$("#answer-"+attempted_list[attempted_que_index].attempted_answer).attr("checked", true);
							$("#label_id"+attempted_list[attempted_que_index].correct_answer).css({"background":"green"});
							
						}
						$(".answer_ri").css({"display":"block"});
						$(".answer_feeback").text(attempted_list[attempted_que_index].answer_feeback);
						$("#next_que").show();
						$("#cont_check").hide();
						
					
					
					}
	
	if(article_question.length===1){
		$("#col0").attr("class", "col-md-12");
		$("#col1").hide();
		$("#col2").hide();
		$("#col3").hide();
		$("#col4").hide();
		$("#col5").hide();
  }
	else if(article_question.length===2){
		$("#col0").attr("class", "col-md-6");
		$("#col1").attr("class", "col-md-6");
		
		$("#col2").hide();
		$("#col3").hide();
		$("#col4").hide();
		$("#col5").hide();
  }
	else if(article_question.length===3){
		$("#col0").attr("class", "col-md-4");
		$("#col1").attr("class", "col-md-4");
		$("#col2").attr("class", "col-md-4");
		$("#col3").hide();
		$("#col4").hide();
		$("#col5").hide();
  }
  else if(article_question.length===4){
		$("#col0").attr("class", "col-md-3");
		$("#col1").attr("class", "col-md-3");
		$("#col2").attr("class", "col-md-3");
		$("#col3").attr("class", "col-md-3");
		$("#col4").hide();
		$("#col5").hide();
  }
  else if(article_question.length===5){
		//col-md-offset-1
		$("#col0").attr("class", "col-md-2 col-md-offset-1");
		$("#col1").attr("class", "col-md-2");
		$("#col2").attr("class", "col-md-2");
		$("#col3").attr("class", "col-md-2");
		$("#col4").attr("class", "col-md-2");
		$("#col5").hide();
  }
  else if(article_question.length===6){
		//col-md-offset-1
		$("#col0").attr("class", "col-md-2");
		$("#col1").attr("class", "col-md-2");
		$("#col2").attr("class", "col-md-2");
		$("#col3").attr("class", "col-md-2");
		$("#col4").attr("class", "col-md-2");
		$("#col5").attr("class", "col-md-2");
  }
	   else {
	    greeting = "Good evening";

	}
}

$("body").on("click","#cont_check",function(){ 
		response_ans = $('input[name="answer"]:checked').val().toString();
		formdata=new FormData();
    		formdata.append("question_id",article_question[question_index].id);
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
					$("#next_que").show();
					$("#cont_check").hide();
					var attempt_json={};
					attempt_json.id=question_id;
					attempt_json.answer_feeback=answer_feeback;
					attempt_json.correct_answer=correct_answer;
					attempt_json.attempted_answer=response_ans;
					attempted_list.push(attempt_json);
					},
				error: function(xhr) {
                     console.log(88);
				}
			});
	//next_que					
});
//
$("body").on("click","#next_que",function(){
				$(".question").remove();
				$(".question_list").after(question);
				$("#cont_check").show();
				$("#next_que").hide();
				$('#tab'+question_index).removeClass('ques1');
				question_index=nextindex(article_question.length, question_index);
				
				$('#tab'+question_index).addClass('ques1');
				
				$(".point_span").text(article_question[question_index].point +" points");
				$("#question_text_int").text(article_question[question_index].question_instruction);
				$("#question_text_main").text(article_question[question_index].question_text);
				$("#label0_text").text(article_question[question_index].option1);
				$("#label1_text").text(article_question[question_index].option2);
				$("#label2_text").text(article_question[question_index].option3);
				$("#label3_text").text(article_question[question_index].option4);
				$("input:radio").change(function () {
					$("#cont_check").prop("disabled", false);
					$(".check_buttton").css({"cursor":"pointer"});
					$(".check_buttton").css({"background":"#4CAF50"});
					$(".check_buttton").attr("class", "button check_buttton submit_response");
					//#a5d7a7
				});

				question_id=article_question[question_index].id;
				attempted_que_index = findindex(attempted_list, question_id);

				if(attempted_que_index!=-1) {
						if (attempted_list[attempted_que_index].attempted_answer===attempted_list[attempted_que_index].correct_answer){
							$("#label_id"+attempted_list[attempted_que_index].attempted_answer).css({"background":"green"});
							$("#answer-"+attempted_list[attempted_que_index].attempted_answer).attr("checked", true);
						}
						else{
							$("#label_id" + attempted_list[attempted_que_index].attempted_answer).css({"background":"red"});
							$("#answer-"+attempted_list[attempted_que_index].attempted_answer).attr("checked", true);
							$("#label_id"+attempted_list[attempted_que_index].correct_answer).css({"background":"green"});
							
						}
						$(".answer_ri").css({"display":"block"});
						$(".answer_feeback").text(attempted_list[attempted_que_index].answer_feeback);
						$("#next_que").show();
						$("#cont_check").hide();
					
					
				}
				else{

				}
				

});

function findindex(q_json, id){ 
		for (i=0;i<q_json.length;i++){
				if (q_json[i].id === id){ 
					return i
				}
		}
		return -1
		
	};
//article_question.length
//question_index
function nextindex(len, curr_id){
		len = len -1; 
		if (len===curr_id){
			return 0
		}
		else{

			return (curr_id+1)
		}
		return -1
		
	};		
});