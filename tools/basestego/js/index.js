function base_stego(fun){
    var access_token = Cookies.get('access_token');
    if(!access_token){
        $(location).prop('href', '/profile/login?goto='+window.location.pathname);
    }else{
        var base = $("input[name='base']:checked").val();
        var post_data = {};
        if(fun=="encode"){
            var plaintext = $("#plaintext").val();
            var stego_text = $("#stego_text").val();
            if(stego_text && plaintext){
                post_data["plaintext"] = plaintext;
                post_data["stego_text"] = stego_text;
            }else{
                alert("隐写文字或加密文本不能为空");
                return;
            }
        }else if(fun=="decode"){
            var res_type = $("input[name='res_type']:checked").val();
            var ciphertext = $("#ciphertext").val();
            if(ciphertext){
                post_data["res_type"] = res_type;
                post_data["ciphertext"] = ciphertext;
            }else{
                alert("隐写文本不能为空");
                return;
            }
        }else{
            alert("未定义操作");
            return;
        }
        $.ajax({
            type: "POST",
            url: api_path + "/v1/base_stego?fun="+fun+"&base="+base,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(post_data),
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization", access_token);
            },
            success:function (res) {
                if(!res){
                    alert("服务器错误");
                }else if(res["success"]){
                    if(fun==="encode"){
                        $("#ciphertext").val(res["data"]["result"]);
                    }else{
                        $("#plaintext").val(res["data"]["plaintext"]);
                        $("#stego_text").val(res["data"]["result"]);
                    }
                }else if(res["msg"]){
                    alert(res["msg"]);
                }else{
                    console.log(res);
                    alert("未知错误");
                }
            }
        });
    }
}
$(function (){
    require_login(function(){
        $("#panel").show();
    });
    $("#encode").click(function(){
        base_stego('encode');
    });
    $("#decode").click(function(){
        base_stego('decode');
    });
    $("#clearall").click(function(){
        $("#stego_text").val("");
        $("#plaintext").val("");
        $("#ciphertext").val("");
    });
});