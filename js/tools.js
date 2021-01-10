function load_tools_items(data){
	$("#contents").html("");
	$.each(data["result"], function (i, item) {
		var tool_url = item["url"].startsWith("http")?item["url"]:(window.location.origin + '/' + item["url"]);
		html = '<div class="tool">'+
			'<div class="tool_title">'+
				'<a>'+item["title"]+'</a>'+
			'</div><hr/>'+
			'<div class="tool_foot">'+
				'<a href="'+tool_url+'" target="_blank" class="btn btn-green btn-border-o">打开</a>'+
				'<a class="btn btn-blue btn-border-o" href="javascript:alert_msg(\'复制成功\');" data-clipboard-text="'+tool_url+'">复制链接</a>'+
			'</div>'+
		'</div>';
		$("#contents").append(html);
	});
	// 处理分页
	$("#contents").append(page_html(data["total"],data["size"],data["page"]));
}
function list(page){
	page = page?'?page='+page:'';
	$.ajax({
		type: "POST",
		url: api_path + "/tools/list" + page,
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify({'keyword': $("#kw").val()}),
		success:function (res) {
			if(res && res["success"]){
				load_tools_items(res["data"]);
			}else{
				console.log(res["msg"]);
			}
		}
	});
	window.scrollTo(0,0);
}
$(function (){
	list();
	new ClipboardJS('.btn');
})