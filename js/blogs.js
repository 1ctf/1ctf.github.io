function load_blogs_items(data){
	$("#contents").html("");
	$.each(data["result"], function (i, item) {
		// id,name,type,url,logo
		// blog:1,github:2,forum:3,team:4
		var type = 'blog';
		if(item["type"]==2){
			type = 'github';
		}else if(item["type"]==3){
			type = 'forum';
		}else if(item["type"]==4){
			type = 'team';
		}
		var url = item["url"] + '?fr=readflag';
		var logo = item["logo"];
		if(!logo.startsWith("http")){
			logo = window.location.origin + '/img/' + type + '/' + item["logo"];
		}
		var html = '<div class="blogs '+type+'">'+
			'<div class="logo"><a href="'+url+'" target="_blank"><img alt="'+item["name"]+'" src="'+logo+'"/></a></div>'+
			'<div class="name"><a href="'+url+'" target="_blank">'+item["name"]+'</a></div>'+
		'</div>'
		$("#contents").append(html);
	});
	$("#contents").append(page_html(data["total"],data["size"],data["page"]));
}
function list(page){
	query_params = page?'?page='+page:'';
	var type = parseInt($("#link-type a.selected:first").attr("data-id"));
	query_params += type > 0?(query_params.length>0?'&':'?')+'type='+type:'';
	$.ajax({
		type: "POST",
		url: api_path + "/blogs/list" + query_params,
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify({'keyword': $("#kw").val()}),
		success:function (res) {
			if(res && res["success"]){
				load_blogs_items(res["data"]);
			}else{
				console.log(res["msg"]);
			}
		}
	});
	window.scrollTo(0,0);
}
$(function (){
	list();
	$("#link-type a").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		list();
	});
})
