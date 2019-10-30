/**
 * 正则表达式列表
 *
 * @author yangjinlai 2018-08-13
 */

//引入当前环境配置
import config from '../../../dist/conf/index'

export default {

	//小数点前最多三位，小数点后最多一位
	// isThreeDianOne: function( str ){
	// 	return str.match(/^\d{0,3}\.?\d{0,1}$/g);
	// },

	//判断小数点前后位数是否符合要求（这里str应该除了小数点就是数字）
	isCheckDotOtherLength: function( str , param ){

		if( str.indexOf('.') != -1){
			//有小数点
			var r = new RegExp('^\\d{1,'+ param.beforeLength +'}\\.?\\d{1,'+ param.afterLength +'}$', 'g');
			//返回经过匹配的str
			return str.match(r);
		}
		else{
			//没有小数点，位数符合要求
			if( str.length <= param.beforeLength ){
				//直接返回str（放在数组里，与上面的match的结果格式匹配，方便外部处理）
				return [str] ;
			}
		}	
	},

	//去掉汉字字母和数字
	stringType: function( str ){
		return str.replace(/^[A-Za-z0-9\u4e00-\u9fa5]+$/g, "");
	},

	//去掉所有空格 
	removeAllSpace: function(str){
		return str.replace(/\s/g, "")
	},

	//判断是否全是数字
	isAllNumber: function(str){
		var reg = /^[0-9]*$/;
		return reg.test(str);    
	},    

	//判断邮箱格式
	checkEmail: function(str){
		var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		return reg.test(str); 
	},

	//判断数字从0-9或是1-9
	checkNumber: function(str){
		var reg = /^[1-9][0-9]*$/;
		return reg.test(str);
	},

	//去掉中文和英文逗号
	removeComma: function(str){
		return str.replace(/,/g,'').replace(/，/g,'');
	},

	//把中文逗号改成英文逗号
	changeChinaComma: function(str){
		return str.replace(/，/g,',');
	},

	//判断是否是全部一样的数字
	isSameNumber: function(str, n){

		var re = new RegExp(n, 'g');

		if( str.match(re).length == str.length ){
		     //全是同样的字符
		     return true;
		}
		return false;
	},

	//判断字符串格式是否超出汉字/英文字母包括大小写/·/空格/下划线,用于姓名校验
    isNameCheck: function(str) {
        var reg_1 = /[\u4e00-\u9fa5]/g;
        var reg_2 = /[_]|[·]|[\s]/g;
        var reg_3 = /[_]|[·]|[a-zA-Z]|[\s]/g;

        if (str.replace(reg_1, '').length != 0) {
            //不是只有中文
            if (str.replace(reg_3, '').length != 0) {
                return false;
            }
        }
        //var reg = /[\u4e00-\u9fa5]|[_]|[·]|[a-zA-Z]|[\s]/g;
        return true;
    },

	//留下所有数字和.
	//去掉其他字符（.之后的字符，如果第一个就不是数字，会从第一个开始被全部去掉）
	onlyNumberDian: function(str){

		//判断小数点的个数
		var d = str.match(/\./g);

		if( !!d && d.length > 1 ){
			//有不止一个小数点
			//返回从0开始到第一个小数点的截取，这样长度就不等于str的长度，说明格式错误
			return str.substring(0, str.indexOf('.') + 1 );
		}
		else{
			//有1个或没有小数点
			//去掉非数字和.
			return str.replace(/[^\d.]/g, '');
		}


		

		// if( !str ){
		// 	return str;
		// }else{
		// 	var s_1 = str.match(/\d+.{1}/g);
		// 	if( s_1 ){
		// 		s_1 = s_1[0];
		// 		var s_2 = str.match(/\d+.{1}\d{0}/g);
		// 		if( s_2){
		// 			s_2 = s_2[0];
		// 			return s_2;
		// 		}else{
		// 			return s_1;
		// 		}
		// 	}
		// 	else{
		// 		return str;
		// 	}
		// }
	},

}