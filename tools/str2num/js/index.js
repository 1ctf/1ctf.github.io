function bin2str(strInput){
    var nInputLength = strInput.length;
    var StrHex = "";
    if(nInputLength%8 == 0){ //当输入够偶数位；
        for (var i=0; i < nInputLength; i = i + 8){
            var str = strInput.substr(i, 8); //16进制；
            //StrHex = StrHex + .toString(16);
            var n = parseInt(str, 2);//10进制；
            StrHex = StrHex + String.fromCharCode(n);
        }
    }
    return StrHex;
}
function str2bin(strInput){
    var nInputLength = strInput.length;
    var StrBinary = "";
    for (var i=0; i < nInputLength; i++) {
        var bin = strInput.charCodeAt(i).toString(2);
        var nBinLen = bin.length;
        if (nBinLen < 8) {
            bin = "000000000" + bin;
            bin = bin.substr(bin.length - 8, 8);
        }
        StrBinary = StrBinary + bin;
    }
    return StrBinary;
}
function str2hex(strInput){
    var nInputLength = strInput.length;
    var StrHex = "";
    for (var i=0; i < nInputLength; i++ )
    {
        StrHex = StrHex + strInput.charCodeAt(i).toString(16);
    }
    return StrHex;
}
function hex2str(strInput){
    var nInputLength = strInput.length;
    var StrHex = "";
    if(nInputLength%2 == 0) { //当输入够偶数位；
        for (var i=0; i < nInputLength; i = i + 2 ) {
            var str = strInput.substr(i, 2); //16进制；
            //StrHex = StrHex + .toString(16);
            var n = parseInt(str, 16);//10进制；
            StrHex = StrHex + String.fromCharCode(n);
        }
    }
    return StrHex;
}
$(function() {
    $("#inputstr").keyup(function(){
        var fun = $("input[name='fun']:checked").val();
        var radix = $("input[name='radix']:checked").val();
        if(radix == 2){
            if(fun == "tonum"){
                var res = str2bin($(this).val());
                if(res){
                    $("#outputstr").val(res);
                }
            }else if(fun == "tostr"){
                var res = bin2str($(this).val());
                if(res){
                    $("#outputstr").val(res);
                }
            }
        }else if(radix == 16){
            if(fun == "tonum"){
                var res = str2hex($(this).val());
                if(res){
                    $("#outputstr").val(res);
                }
            }else if(fun == "tostr"){
                var res = hex2str($(this).val());
                if(res){
                    $("#outputstr").val(res);
                }
            }
        }
    });
    $("input[type='radio']").click(function(){
        $("#inputstr").val("");
        $("#outputstr").val("");
    });
});