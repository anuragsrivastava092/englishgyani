var filter_count = 0; //0=down
	$( "#eg_main_filter_button" ).click(function() {
	if (filter_count%2===0){
		$("#arrow_icon").attr("class", "fa fa-angle-up");
		$(".eg_filter_ele").css({"display":"block"});
				
	
	}
	else{
		$("#arrow_icon").attr("class", "fa fa-angle-down");
		$(".eg_filter_ele").css({"display":"none"});
		$("#subcat2").css({"display":"none"});
	}
	filter_count+=1;
		

});

$( ".filt_sub2" ).click(function() {
	
	var  main_sub_cat_ele_id = $(this).attr('id');
	var  main_active_sub_cat_ele_id = $(".fil_active1").attr('id');
	
	if (main_sub_cat_ele_id != main_active_sub_cat_ele_id){
		$("#"+main_active_sub_cat_ele_id).attr("class", "filter_button filt_sub2");
		$("#"+main_sub_cat_ele_id).attr("class", "filter_button filt_sub2 fil_active1");
	
	}
});
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


$( ".eg_clear_filter_button" ).click(function() {
		clearfilter();
});
    $( ".see_all_art" ).click(function() {
		clearfilter();
        formdata=new FormData();
    //formdata.append(cat_text.toString(),cat_text.toString())
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
					$(".list_container").remove();
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
$( ".eg_filter_button" ).click(function() {
		//fil_active3
		cat_text = $(".fil_active1").text().toLowerCase();
		//cat_level = $(".fil_active2").map(function() { return $(this).text(); });
		//cat_content = $(".fil_active3").map(function() { return $(this).text(); });
		//console.log(cat_text);
    formdata=new FormData();
    formdata.append(cat_text.toString(),cat_text.toString());
    //formdata.append("anurag","anurag")


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
                    console.log(response);
                    article_json = jQuery.parseJSON( response );
					$(".list_container").remove();
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