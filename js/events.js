function load_events_items(data){
    $("#contents").html("");
    $.each(data["result"], function (i, item) {
        var link = item["link"]?'<a href="'+item["link"]+'?fr=readflag" target="_blank">点击访问</a>':'';
		var html = '<div class="event_info event_status'+item["status"]+'">'+
            '<div><label>比赛名称：</label><a href="javascript:show_more('+item["id"]+');">'+item["name"]+'</a></div>'+
            '<div><label>比赛链接：</label>'+link+'</div>'+
            '<div><label>比赛类型：</label><a>'+item["type"]+'</a></div>'+
            '<div><label>报名开始：</label><a>'+item["bmks"]+'</a></div>'+
            '<div><label>报名截止：</label><a>'+item["bmjz"]+'</a></div>'+
            '<div><label>比赛开始：</label><a>'+item["bsks"]+'</a></div>'+
            '<div><label>比赛结束：</label><a>'+item["bsjs"]+'</a></div>'+
        '</div>';
		$("#contents").append(html);
	});
    $("#contents").append(page_html(data["total"],data["size"],data["page"]));
}
/*点击弹出按钮*/
function popBox() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "block";
    popLayer.style.display = "block";
};

/*点击关闭按钮*/
function closeBox() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "none";
    popLayer.style.display = "none";
}
function show_more(id){
    $.ajax({
		type: "POST",
		url: api_path + "/events/list?id=" + id,
		contentType: "application/json",
		success:function (res) {
			if(res && res["success"]){
                var data = res["data"];
				$("#ename").text(data["name"]);
                $("#elink").text(data["link"]);
                $("#etype").text(data["type"]);
                $("#ebmks").text(data["bmks"]);
                $("#ebmjz").text(data["bmjz"]);
                $("#ebsks").text(data["bsks"]);
                $("#ebsjs").text(data["bsjs"]);
                $("#emore").html(data["readmore"]);
                popBox();
			}else{
				console.log(res);
			}
		}
	});
}
function list(page){
    page = page?'?page='+page:'';
    $.ajax({
		type: "POST",
        url: api_path + "/events/list" + page,
		contentType: "application/json",
		success:function (res) {
			if(res && res["success"]){
				load_events_items(res["data"]);
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