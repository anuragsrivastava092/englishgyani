var article_json1 = [{"image":"https://d34yfym6wfrgx6.cloudfront.net/uploads/article/custom_image/139851/super_large_Instagram-for-money.jpg","level":2,"summary":"A new generation of investors with a conscience can help you make money while putting your dollars to good use.","date":"10/19/2016","source":"Desitomato","source_url":"http://Desitomato.com","content":"text","article_id":2323,"head":"Get Rich While Doing Good"},
{"image":"https://d34yfym6wfrgx6.cloudfront.net/uploads/article/custom_image/140597/super_large_factory.jpg","level":4,"summary":"As factory floors become more automated and data-driven, manufacturing companies are in need of computer engineers. But they often find themselves outgunned by Silicon Valley tech firms.","date":"10/20/2016","source":"The Hindu","source_url":"http://thehindu.com","content":"text","article_id":2393,"head":"Manufacturers Lose Out on Tech Talent"}
];

    
var last_d;
	if(article_json.length===0){
		$("#no_article").css({"display":"block"});
	}
	else{
		addarticle();
	}
//redirect_page
$(".main_right").on("click",".redirect_page",function(){ 
	present = this;
	//console.log(present);
	var present_class= $(present).attr("id")
	present_id = present_class.slice(3);

	//console.log(present_id);
 window.location.assign("http://englishgyani.com/article-content/"+present_id);
 
 
 });
 //load_button
 $(".main_right").on("click",".load_button",function(){
        //last_d
        //clearfilter();
        formdata=new FormData();
     if(cat_text.toString()==="all") {

         formdata.append('id',last_d);
     }
     else{
         formdata.append(cat_text.toString(),cat_text.toString());
         formdata.append(cat_text.toString()+'_id',last_d);

     }
      //formdata.append(cat_text.toString(),cat_text.toString());
    //formdata.append('id',last_id);
    formdata.append("all","all")


			$.ajax({
                 beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
                },
				url: "/api/article-filter/",
				data:formdata,
                cache: false,
				type: "POST",
                contentType:false,
                processData: false,
				success: function(response) {
                    article_json = jQuery.parseJSON( response );
                    console.log(response);
					//$(".list_container").remove();
                    $("#no_article").css({"display":"none"});
				if(article_json.length===0){
					$("#no_article").css({"display":"block"});
				}
				else{
					addarticle();
				}
				},
				error: function(xhr) {
                     console.log(88);
				}
			});

 });
 
 function clearfilter(){ 
			$(".fil_active1").attr("class", "filter_button filt_sub2");
			$("#eg_by_sub_cat1").attr("class", "filter_button filt_sub2 fil_active1");
			$(".filt_sub3").attr("class", "filter_button filt_sub3");
			$(".filt_sub4").attr("class", "filter_button filt_sub4");

			
};
 function addarticle(){
     article_json.reverse();
	for (i=0;i<article_json.length;i++){
        if( i===0){
            last_d = article_json[i].id;
        }
        //data-toggle="tooltip" title="Hooray!"
		var first_div = document.createElement("div"); 
			$(first_div).addClass("list_container");
			$(first_div).attr("id", article_json[i].id);

		var first_div_fi_child = document.createElement("div"); 
			$(first_div_fi_child).addClass("main_right_left boxshadow");
			first_div.appendChild(first_div_fi_child);
		var first_div_se_child = document.createElement("div"); 
			$(first_div_se_child).addClass("main_right_right");
			first_div.appendChild(first_div_se_child);
		var first_image = document.createElement("img");
			$(first_image).attr("src","/static/images/article_images/"+article_json[i].image+'/');
			$(first_image).attr("alt", "article image");
//{#			$(first_image).attr("onlick", "javascript:location.href='{% url 'article_url' article_id ="+lit[i].id+" }'");#}
			$(first_image).attr("class", "image_article redirect_page");
			$(first_image).attr("id", "img"+article_json[i].id);
			first_div_fi_child.appendChild(first_image);
		var sec1_div = document.createElement("div"); 
			$(sec1_div).addClass("news_sum_top");
			first_div_se_child.appendChild(sec1_div);
		var sec2_div = document.createElement("div"); 
			$(sec2_div).addClass("news_sum_head");
			first_div_se_child.appendChild(sec2_div);
		var sec3_div = document.createElement("div"); 
			$(sec3_div).addClass("news_sum_body");
			first_div_se_child.appendChild(sec3_div);
		var sec4_div = document.createElement("div"); 
			$(sec4_div).addClass("news_sum_foot");
			first_div_se_child.appendChild(sec4_div);
			//<p class="news_level_icon">5</p>
		if(user_name.length!=0){
		var news_status = document.createElement("span");
			$(news_status).addClass("news_status");
			$(news_status).attr("data-toggle","tooltip");
			$(news_status).attr("title","You have attempted all the questions");
			$(news_status).text("Completed");
			sec1_div.appendChild(news_status);
		}
		var level_span = document.createElement("span");
			$(level_span).addClass("news_level_icon");
			$(level_span).attr("data-toggle","tooltip");
			$(level_span).attr("title","Exercise Difficulty Level");
			$(level_span).text(article_json[i].level);
			sec1_div.appendChild(level_span);
					//<h2>Manufacturers Lose Out on Tech Talent</h2>
		var art_head = document.createElement("h2");
			$(art_head).addClass("redirect_page");
			$(art_head).text(article_json[i].head);
            
			$(art_head).attr("id", "hed"+article_json[i].id);
			sec2_div.appendChild(art_head);
			//<p>As factory floor
		var art_summ = document.createElement("p");
			$(art_summ).text(article_json[i].summary);
			sec3_div.appendChild(art_summ);
			//<i class="fa fa-calendar" aria-hidden="true"></i>
		var font_cale = document.createElement("i");
			$(font_cale).addClass("fa fa-calendar");
			$(news_link).attr("aria-hidden", "true");
			sec4_div.appendChild(font_cale);
			//sec4_div.appendChild("<i class='fa fa-calendar' aria-hidden='true'></i>");
			//<span>19/10/16</span> 
		var date_span = document.createElement("span");
			$(date_span).text(article_json[i].date);
			$(date_span).addClass("icon_space");
			sec4_div.appendChild(date_span);
			//<a href="http://www.google.com" class="article_src">The Economist</a>
		var news_link = document.createElement("a");
			$(news_link).text(article_json[i].source);
			$(news_link).attr("href",article_json[i].source_url);
			$(news_link).addClass("article_src icon_space");
			sec4_div.appendChild(news_link);
			//<span class="news_level_icon2 star_icon2" ><i class="fa fa-file-text" aria-hidden="true"></i></span>
		var content_span = document.createElement("span");
		$(content_span).addClass("news_level_icon2 star_icon2");
		$(content_span).attr("data-toggle","tooltip");

		var font_cont = document.createElement("i");
			
		if (article_json[i].type===1){
			$(font_cont).addClass("fa fa-file-text");
			$(content_span).attr("title","Article Type Exercise");
		}
		else if (article_json[i].type===2) {
			$(font_cont).addClass("fa fa-google");
			$(content_span).attr("title","Grammar Type Exercise");
		}
		else if (article_json[i].type===3) {
			$(font_cont).addClass("fa fa-video-camera");
			$(content_span).attr("title","Video Type Exercise");
		}
			$(font_cont).attr("aria-hidden", "true");
			content_span.appendChild(font_cont);
		
			sec4_div.appendChild(content_span);
		// eg_filter
		
		$(".eg_filter").after(first_div);
		var space_br = document.createElement("br");
		$(".eg_filter").after(space_br);
		}


};
