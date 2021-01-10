function load_softs_items(data){
    $("#contents").html("");
    $.each(data["result"], function (i, item) {
        var html = '<a class="soft_item" href="'+item["url"]+'?fr=readflag" target="_blank">'+
            '<div class="title"><span>'+item["name"]+'</span></div>'+
            '<div class="desc">'+item["desc"]+'</div>'+
        '</a>';
		$("#contents").append(html);
	});
    $("#contents").append(page_html(data["total"],data["size"],data["page"]));
}
function list(page){
    page = page?'?page='+page:'';
    var access_token = Cookies.get('access_token');
    if(!access_token){
        $(location).prop('href', '/profile/login?goto='+window.location.pathname);
    }else{
        $.ajax({
            type: "POST",
            url: api_path + "/softs/list" + page,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({'keyword': $("#kw").val()}),
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization", access_token);
            },
            success:function (res) {
                if(res && res["success"]){
                    load_softs_items(res["data"]);
                }else{
                    console.log(res["msg"]);
                }
            }
        });
        window.scrollTo(0,0);
    }
}
$(function (){
    list();
});