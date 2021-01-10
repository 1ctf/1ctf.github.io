document.getElementById("base64").addEventListener("dragenter", function(event) { event.preventDefault(); }, false);
document.getElementById("base64").addEventListener("dragover", function(event) { event.preventDefault(); }, false);
document.getElementById("base64").addEventListener("drop", function(event) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("base64").value=e.target.result;
        // document.body.classList.remove('empty');
    };
    reader.readAsDataURL(event.dataTransfer.files[0]);
    event.preventDefault();
}, false);
var data_png = "data:image/png;base64,";
var data_jpg = "data:image/jpeg;base64,";
var data_gif = "data:image/gif;base64,";
var data_ico = "data:image/x-icon;base64,";
var data_file = "data:application/x;base64,";
function showfile(){
    var base64 = $("#base64").val();
    if(base64.length>0){
        if(!base64.startsWith("data:")){
            if(base64.startsWith("iVB")){
                base64 = data_png + base64
            }else if(base64.startsWith("/9j")){
                base64 = data_jpg + base64
            }else if(base64.startsWith("R0l")){
                base64 = data_gif + base64
            }else if(base64.startsWith("AAA")){
                base64 = data_ico + base64
            }else{
                base64 = data_file + base64
            }
            $("#base64").val(base64);
        }
        if(base64.startsWith(data_png)||base64.startsWith(data_jpg)||
            base64.startsWith(data_gif)||base64.startsWith(data_ico)){
            $("#viewfile").html('<img src="'+base64+'" alt="" />');
        }else{
            base64 = data_file + base64.substr(base64.indexOf("base64,")+"base64,".length);
            $("#viewfile").html('<a href="'+base64+'">不支持预览，点击下载文件</a>');
        }
    }else{
        alert("base64不能为空");
    }
}
function resetfile(){
    $("#base64").val('');
    $("#viewfile").html('');
}