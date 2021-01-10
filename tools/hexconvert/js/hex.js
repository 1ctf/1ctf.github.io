/**
 * https://blog.csdn.net/qiziyiming/article/details/83445624
 * 进制转换 <br>
 * 可以是绝对任意进制，，如果进制大于62进制，则必须使用其它进制表示一位， <br>
 * 比如256进制可以使用两个16进制表示一位（xx-xx-xx） <br>
 * 62进制中（Z~A：61~36；z~a：35~10；9~0）
 * 
 * @author Administrator
 * 
 */
 
/**
 * 62进制
 */
var bdm62 =[62];
/**
 * 一个62个字符，方便查询，0~9a~zA~Z <br>
 * 对应62进制
 */
var bdm62Str = "";
/**
 * 使最后输出double类型的值不以科学计数法输出
 */
function Hexadecimal() {
	/**
	 * 使最后输出double类型的值不以科学计数法输出
	 */
	for (var i = 0; i <= 9; i++) { /* 0~9 */
		bdm62[i] =String.fromCharCode((i + 48));
	}
	for (var i = 0; i < 26; i++) { /* a~z */
		bdm62[i + 10] =String.fromCharCode((i + 97));
	}
	for (var i = 0; i < 26; i++) { /* A~Z */
		bdm62[i + 36] =String.fromCharCode((i + 65));
	}
	for (var i = 0; i < bdm62.length; i++) {
		bdm62Str+=bdm62[i];
	}
}
Hexadecimal();
function calc_a2b(){
    var hex_val = $("#hex_val").val();
    var from_hex = $("#from_hex").val();
    var to_hex = $("#to_hex").val();
    if(from_hex<2 || to_hex<2){
        return;
    }
    var nto10 = getNto10_0(hex_val, '-', from_hex, 62);
    var get10ToN = get10ToN_10(nto10,to_hex,62,'-',true);
    $("#res_val").val(get10ToN);
}

/**
 * @see #getNto10(String,String,var,var)
 * @param name {@link #getNto10(String, String, var, var)}
 * @param now  {@link #getNto10(String, String, var, var)}
 * @param pos  {@link #getNto10(String, String, var, var)}
 * @return
 * @throws Exception
 */
function getNto10(name, now, pos){
	return getNto10_0(name,"-",now,pos);
}
/**
 * N进制转10进制
 * 
 * @param name
 *            N进制表示信息<br>
 *            xxxnxnxnn（没有进制位，最大62进制Aa0）或者<br>
 *            xn-xn-xx-nn（每一位使用其它进制表示， <br>
 *            比如256进制可以使用两个16进制表示一位（xx-xx-xx））
 * @param nameSplit 分隔的字符
 * 
 * @param now
 *            现在的进制
 * @param pos
 *            进制位是多少进制表示，最大62(pos<2默认62)
 * @return
 */
function getNto10_0(name, nameSplit,  now,  pos){
	/**
	 * 判断最大位进制表示
	 */
	if (pos > 62) {
		pos = 62;
	} else if (pos < 2) {
		pos = 62;
	}
	/**
	 * 最后的计算的结果
	 */
	var m = 0;
	/**
	 * 如果现进制大于位进制
	 */
	if (now > pos) {
		/**
		 * 位进制的合理表示长度
		 */
		var k = 0;
		/**
		 * 使用对数计算最佳长度
		 * 例如256进制使用16进制表示，最多需要2位16进制表示一位
		 * 它们之间存在对数关系
		 */
		var lontem =lon(now,pos);
		k=lon;
		/**
		 * 如果存在小数
		 */
		if(lontem>k){
			k++;
		}
		/**
		 * 数组，把每阶的数转换成位进制后保存到数组中，然后再次进行阶运算
		 */
		var arrayList = new Array();
		var arrayList_i=0;
		
		/**
		 * 如果使用了分隔符
		 */
		if (name.indexOf(nameSplit) > 0||name.length<k) {
			var split = name.split(nameSplit);
			/**
			 * 先计算每组的10进制数
			 */
			for (var i = 0; i < split.length; i++) {
				/**
				 * 如果这一组长度不符合，则退出计算，返回错误提示
				 */
				if (split[i].length > k) {
							
					alert(name + "\t(" + split[i]
							+ ")格式错误，长度应为：" + k);
				}
				/**
				 * 递归调用，返回这一组的10进制数
				 */
				var setHdl10 = getNto10_0(split[i],nameSplit, pos, 0);
				/**
				 * 保持到数组
				 */
				arrayList[arrayList_i++]=(setHdl10);
			}
		} else {
			/**
			 * 没有使用分隔符，长度必须符合
			 */
			var i=0;
			while(true){
				/**
				 * 字符串截取，每次截取k个
				 */
				if(name.length>(i + 1) * k){
					var substring=name.substring(i * k, (i + 1) * k);
					var setHdl10 = getNto10(substring,nameSplit, pos, 0);
				arrayList[arrayList_i++]=(setHdl10);
				}else {
					/**
					 * 如果正好等于或者小于
					 */
					var substring=name.substring(i * k,name.length);
					var setHdl10 = getNto10(substring,nameSplit, pos, 0);
					arrayList[arrayList_i++]=(setHdl10);
					break ;
				}
				i++;
			}
		}
		/**
		 * 再把每组的10进制数据再做阶级计算
		 * 例：34567
		 * 7+0
		 * 7+0+6*10
		 * 7+0+6*10+5*100
		 * 7+0+6*10+5*100+4*1000
		 * 7+0+6*10+5*100+4*1000+3*10000=34567
		 */
		var length = arrayList.length - 1;
		for (var i = length; i >= 0; i--) {
			var double1 = arrayList[i];
			/**
			 * 幂运算
			 */
			var pow = Math.pow(now, length - i);
			m += double1 * pow;
		}
	} else {
		/**
		 * 先判断字符串是否符合当前进制规则
		 * 10进制：0~9
		 * 16进制：0~9a~f
		 */
		if (!getSpecial(name, now)) {
			var length = name.length - 1;
			/**
			 * 再阶级幂运算
			 * 例16进制：adb467
			 * 7+0
			 * 7+0+6*16
			 * 7+0+ 6*16+ 4*16*16
			 * 7+0+ 6*16+ 4*16*16+ 11[b]*16*16*16
			 * 7+0+ 6*16+ 4*16*16+ 11[b]*16*16*16+ 13[d]*16(4个)
			 * ......
			 */
			for (var i = length; i >= 0; i--) {
				/**
				 * 获取当前为字符
				 */
				var charAt = name.charAt(i);
				/**
				 * 查找字符的位置，它的位置正好是它表示的数值
				 */
				var indexOf = bdm62Str.indexOf(charAt);
				/**
				 * 阶级幂运算
				 */
				var pow = Math.pow(now, length - i);
				/**
				 * 如果当前为为0，则不需要
				 */
				if(indexOf>0){
					m += indexOf * pow;
				}
			}
		} else {
			alert(name + "不符合" + now + "进制："
			+ bdm62Str.substring(0, now));
		}
	}
	return m;
}
/**
 * @see #get10ToN(double, double, double, String)
 * @param name
 * @param get
 * @param pos
 * @return
 * @throws Exception 
 */
function get10ToN(name,get,pos){
	return get10ToN_10(name, get, pos, null,true);
}
/**
 * N进制转换
 * @param name 数据
 * @param get N进制
 * @param pos 进制位表示
 * @param nameSplit 分隔符，空则不使用
 * @param isReverse 字符串是否倒序
 * @return
 * @throws Exception 
 */
function get10ToN_10(name,get,pos,nameSplit,isReverse) {
	
	var split = nameSplit==null||nameSplit=="";
	if(get>pos && split){
		alert("必须使用分隔符");
	}
	if(name<0){
		name*=-1;
	}
	/**
	 * 字符串累加
	 */
	var stringBuilder = "";
	/**
	 * 判断最大位进制表示
	 */
	if (pos > 62) {
		pos = 62;
	} else if (pos < 2) {
		pos = 62;
	}
	if(get>pos){
		/**
		 * 刚好是get进制的倍数
		 */
		var d = lon(name,get);
		if(Math.round(d)==d){
			for (var i = 0; i < d; i++) {
				stringBuilder+='0';
				stringBuilder+=nameSplit;
			}
			stringBuilder+='1';
		}else {
			/**
			 * 
			 */
			while (name>0) {
				/**
				 * 
				 */
				d = name%get;
				name-=d;
				if(d>0){
					/**
					 * 递归调用，计算表示进制
					 */
					var strTem = get10ToN_10(d, pos, pos, nameSplit,false);
					stringBuilder+=strTem;
					/**
					 * 后面还有数
					 */
					if(name>0){
						stringBuilder+=nameSplit;
					}
				}else {
					stringBuilder+='0';
					/**
					 * 后面还有数
					 */
					if(name>0){
						stringBuilder+=nameSplit;
					}
				}
				name/=get;
			}
		}
	}else {
		/**
		 * 刚好是get进制的倍数
		 */
		var d = lon(name,get);
		/**
		 * 取最近的整数比较
		 */
		if(Math.round(d)==d){
			for (var i = 0; i < d; i++) {
				stringBuilder+='0';
			}
			stringBuilder+='1';
		}else {
			/**
			 * 
			 * 不是进制的倍数
			 */
			while (name>0) {
				/**
				 * 例如时间毫秒值的计算：1000*60*60*10=10小时=3600000
				 * 3600000%1000							3600000%1000微秒
				 * (3600000-3600000%1000)/1000=3600		3600000%1000秒
				 * (3600-3600%60)/60=600				3600%60分
				 * (600-600%60)/60=10					小时
				 */
				d =name%get;
				name-=d;
				
				stringBuilder+=bdm62Str.charAt(d);
				name/=get;
			}
		}
	}
	if(isReverse){
		/**
		 * 倒序后，再返回最后的字符串，
		 */
		 var strtem="";
		for(var i=stringBuilder.length-1;i>=0;i--){
			strtem+=stringBuilder.charAt(i);
		}
		return strtem;
	}else {
		return stringBuilder;
	}
}
/**
 * 换底公式
 * @param value	对数
 * @param base 底数
 * @return
 */
function lon(value, base){
	return Math.log(value)/Math.log(base);
}
/**
 * 判断字符串是否符合K进制要求
 * 
 * @param name
 * @param k
 * @return
 */
function getSpecial(name, k){
	var substring = bdm62Str.substring(0, k);
	var matches =RegExp( "/^[" + substring + "]*$/");
	return getSpecial0(name, matches);
}
 
/**
 * 判断字符串是否符合规则
 * 
 * @param name
 *            字符串
 * @param matches
 *            正则表达式
 * 
 * @return
 */
function getSpecial0(name, matches) {
	return matches.test(name);
}