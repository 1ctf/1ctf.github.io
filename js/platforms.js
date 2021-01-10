function load_platforms_items(data){
    $("#contents").html("");
    $.each(data["result"], function (i, item) {
		var html = '<a class="plat_item" href="'+item["url"]+'?fr=readflag" target="_blank">'+
            '<div class="title"><span>'+item["name"]+'</span></div>'+
            '<div class="desc">'+item["desc"]+'</div>'+
        '</a>';
		$("#contents").append(html);
	});
    $("#contents").append(page_html(data["total"],data["size"],data["page"]));
}
function list(page){
    page = page?'?page='+page:'';
    $.ajax({
		type: "POST",
		url: api_path + "/platforms/list" + page,
		contentType: "application/json",
		success:function (res) {
			if(res && res["success"]){
				load_platforms_items(res["data"]);
			}else{
				console.log(res["msg"]);
			}
		}
	});
	window.scrollTo(0,0);
}
$(function (){
    list();
});