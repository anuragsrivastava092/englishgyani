$(document).ready(function(){
	
	var delete_word=0;
	//var bookmark_list= [];
	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
			if(bookmark_list.length===0){
					$("#no_article").css({"display":"block"});
				}
			else{
			for (i=0;i<bookmark_list.length;i++){
				var first_div = document.createElement("div"); 
					$(first_div).addClass("word_container");
					$(first_div).attr("id", "div" +bookmark_list[i].id);
				var first_div_fi_child = document.createElement("div"); 
					$(first_div_fi_child).addClass("word_container_left");
					first_div.appendChild(first_div_fi_child);
				var first_div_se_child = document.createElement("div"); 
					$(first_div_se_child).addClass("word_container_right");
					first_div.appendChild(first_div_se_child);
					//<div class="word_no">
					//			<h2>3.</h2>
					//		</div>
				var word_no_div = document.createElement("div"); 
					$(word_no_div).addClass("word_no");
					first_div_fi_child.appendChild(word_no_div);
					//$(word_h2).addClass("word_no");
				var no_span = document.createElement("span"); 
					$(no_span).attr("id", i);
					$(no_span).addClass("no_span");
					$(no_span).text(i+1);
					word_no_div.appendChild(no_span);
					//<div class="word_name">
				var word_name_div = document.createElement("div"); 
					$(word_name_div).addClass("word_name");
					first_div_fi_child.appendChild(word_name_div);
				//<h2 >Clarity</h2>
				var word_side_head = document.createElement("div"); 
					$(word_side_head).addClass("word_side_head");
					word_name_div.appendChild(word_side_head);

				var word_side = document.createElement("div"); 
					$(word_side).addClass("word_side");
					word_side_head.appendChild(word_side);

				var word_h2 = document.createElement("h2");
					$(word_h2).text(bookmark_list[i].word);
					word_side.appendChild(word_h2);

				var word_progress_side = document.createElement("div"); 
					$(word_progress_side).addClass("word_progress_side");
					word_side_head.appendChild(word_progress_side);
					//progress
				var progress = document.createElement("div"); 
					$(progress).addClass("progress");
					$(progress).attr("data-toggle", "tooltip");
					$(progress).attr("title", "Word Strength");
					word_progress_side.appendChild(progress);
					//progress-bar
				var progress_bar = document.createElement("div"); 
					$(progress_bar).addClass("progress-bar progress-bar-success");
					$(progress_bar).attr("role", "progressbar");
					$(progress_bar).attr("aria-valuenow", "10");
					$(progress_bar).attr("aria-valuemin", "0");
					$(progress_bar).attr("aria-valuemax", "100");
					$(progress_bar).css({"width": bookmark_list[i].strength+"%"});
					
					progress.appendChild(progress_bar);
				//<span class="only">100% Memorize</span>
				var only = document.createElement("span");
					$(only).addClass("only");
					$(only).css({"color": "black"});
					$(only).text(bookmark_list[i].strength+"% Memorize");
					progress_bar.appendChild(only);
					//<h3 class="word_meaning">infinitely or immeasurably small</h3>
				var meaning_h3 = document.createElement("h3");
					$(meaning_h3).text(bookmark_list[i].meaning);
					word_name_div.appendChild(meaning_h3);
					// <p class="word_par">
				var sentence_p = document.createElement("p");
					$(sentence_p).addClass("word_par");
					$(sentence_p).text(bookmark_list[i].sentence);
					word_name_div.appendChild(sentence_p);		
				
				var delete_div = document.createElement("div"); 
					$(delete_div).addClass("word_remove_button");
					first_div_se_child.appendChild(delete_div);
				var delete_button = document.createElement("button"); 
					$(delete_button).addClass("button");
					$(delete_button).text("Remove");
					$(delete_button).attr("id", bookmark_list[i].id);
					delete_div.appendChild(delete_button);	


				$(".list_bookmark_word").append(first_div);
			}
}
//
$(document).on('click', ".button", function() {
	
			del_id = $(this).attr('id');
			obj = $("#word"+del_id);
			bookmark_word=$(obj).text()
			delete_bookmark(bookmark_word);
			$("#div"+del_id).remove();
			delete_word+=1;
			var child_list = $(".no_span")
			for (i=0;i<child_list.length;i++){
				$(child_list[i]).text(i+1);
			}
			if(bookmark_list.length===delete_word){
				$("#no_article").css({"display":"block"});
			}
});
//

$(document).on('click', ".see_all_art", function() {
	console.log(this);
	if(user_name.length===0) 
	{
		$("#myModal").modal();
		$(".sign_text").text("Login to bookmark this 	list");
	}
});
function delete_bookmark(word){
		formdata=new FormData();
		formdata.append("word",word);


			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/delete-bookmark/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) {
                    //article_json = jQuery.parseJSON( response );
        
					
				},
				error: function(xhr) {

                   
				}
			});
			
	}

});