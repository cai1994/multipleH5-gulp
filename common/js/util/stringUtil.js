/**
 * 对字符串的处理函数
 */


export default  {

	//给数字添加千分位的逗号
	comdify: function(n){
		//n是传进来的需要添加千分位的数据，格式需要为字符串
		if(typeof n == 'number'){
			n = n + '';  //n如果为数字，转换成字符串
		}
		//添加千分位
		var re = /\d{1,3}(?=(\d{3})+$)/g;
	　　var n1 = n.replace(/^(\d+)((\.\d+)?)$/,
			function(s,s1,s2){
				return s1.replace(re,"$&,") + s2;
			}
		);
		//返回处理过的字符串
	　　return n1;
	},


	//身份证-生日入参是simple时，格式是20170112，默认为2017-01-12
	certificateToBirth : function(str, type){
		// str = str + "";
		
		//默认设置n=0;
		var n = 0; 

		if( str.length > 8){
			//生日位数多于8位时，默认n=0
			n = 6;
		}
		
		var n = parseInt(n);
		 var year =  str.substring(n,n+4);
         var month = str.substring(n+4,n+6);
         var day = str.substring(n+6,n+8);
         if (type == "simple") {
         	return  year+month+day
         }
         return  year +"-"+month +"-"+day
	},

	//在字符串的对应位置中添加空格
	//如身份证号码和银行卡号
	changeArr : function(val, num){
		var that = this;
    	
        var str = that.regList.removeAllSpace(val),
              arr = str.split(""); //分拆成数组

        $.each(num,function(i, el){
            arr.splice(el,0, " "); //在对应位置添加空格
        })

        return $.trim(arr.join("")); //组合成字符串并返回, 要加trim，否则后面加一串空格，长度不正确
    },
    
	// 根据用户输入的身份证号自动选择用户性别,15位身份证倒数第1位奇数为男性，偶数为女性18位身份证倒数第2位奇数为男性，偶数为女性
	judgeGender:function(idNo){
			var sex,
			sexObj = {};
			// 去除所有的空格
			var nolength = $.util.regList.removeAllSpace(idNo);
		    if(nolength.length==18){
		        sex=nolength.substring(16,17)
		    }else if(nolength.length==15){
		        sex=nolength.substring(14,15)
		    }
		    if (sex % 2) {
		    	sexObj.gender = "男";
		    	sexObj.num = 1;
		    }else{
		    	sexObj.gender = "女";
		    	sexObj.num = 0;
		    };
		    return sexObj;
	}
}