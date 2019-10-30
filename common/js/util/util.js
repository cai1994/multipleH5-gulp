/**
 * 基础函数
 * @author  yangjinlai  2016-11-21
 */


//获取一个变量的类型
var getVarType = {

	//1. 对象
	isObjEmpty : function(data){
		for(var i in data){
 　　　　	return 'obj'; 
 　　　 }
	},  

	//2. 函数
	isFunction : function(data){
		//原生写法
		if(Object.prototype.toString.call(data) === "[object Function]"){
			//是函数，表示
			return 'function';
		}
	},

	//3. 数组
	isArray : function(data){
		//原生写法
		if(Object.prototype.toString.call(data) === '[object Array]'){
			//是函数，表示
			return 'array';
		}
	},

	//4. 字符串
	isString : function(data){
		//原生写法
		if(Object.prototype.toString.call(data) === '[object String]'){
			//是函数，表示
			return 'string';
		}
	}
};


//判断数据是否为空
var objIsNotEmpty = function( data ){

	//根据接口文档，该data不会为数字、字符串和函数
	//data为数字，字符串、函数、空数组，null或undefined，全部按没有数据处理
	if( !data || !isNaN(data) ||  
			getVarType.isFunction(data) == 'function' || 
			getVarType.isString(data) == 'string' || 
			//getVarType.isObjEmpty(data) != 'obj' ||
			( getVarType.isArray(data) == 'array' && data.length == 0)
		){
		return false;
	}
	
	// if( !!data && getVarType.isObjEmpty(data) != 'obj' && 
	// 		( !isNaN(data) ||  
	// 			getVarType.isFunction(data) == 'function' || 
	// 			getVarType.isString(data) == 'string' || 
	// 			( getVarType.isArray(data) == 'array' && data.length == 0)
	// 		) ) {
	// 		return false;
	// 	}

	// //其他情况
	return true;
}

//深拷贝一个对象（对象中可以带数组）
var objDeepCopy = function( data ){
    var dataCopy = getVarType.isArray(data)  == 'array' ? [] : {};
    for (var item in data) {
        dataCopy[item] = typeof data[item] === 'object' ? objDeepCopy(data[item]) : data[item];
    }
    return dataCopy;
}

//合并两个对象
//data_1和data_2必须是对象
//数组会合并，字符串/boolean/number会覆盖
var objDeepCombine = function( data_1, data_2 ){

	var result = {};

	//循环data_2
	for (var i in data_2){

        if( data_1.hasOwnProperty(i)){
        	if( getVarType.isArray(data_1[i])  == 'array'){
        		if( getVarType.isArray(data_2[i])  == 'array'){
		        	//如果data_1中有此属性，且是数组，判断data_2中的该属性是否为array
		        	result[i] = data_1[i].concat().concat(data_2[i]).concat();
		        }
		        else{
		        	//直接使用2的值
        			result[i] = objDeepCopy(data_2[i]);
		        }
	        }
	        else if( getVarType.isObjEmpty(data_1[i])  == 'obj'){
	        	if( getVarType.isObjEmpty(data_2[i])  == 'obj'){
	        		//两个都为对象，再次执行此方法
	        		result[i] = objDeepCombine(data_1[i], data_2[i] );
	        	}
	        }
	        else{
	        	//直接使用2的值
	        	result[i] = objDeepCopy(data_2[i]);
	        }
        } 
        else{
        	//直接使用2的值
        	result[i] = objDeepCopy(data_2[i]);
        }
    }
    return result;
}

module.exports = {

	//获取一个变量的类型
	getVarType:  getVarType,

	//判断数据是否为空
	objIsNotEmpty: objIsNotEmpty,

	//深拷贝一个对象（对象中可以带数组）
	objDeepCopy: objDeepCopy,

	//合并两个对象
	objDeepCombine: objDeepCombine,

	//操作cookie
	cookieAction: {

		//获取cookie
		getCookie: function(name){
			var arr = document.cookie.split("; ");
			for(var i=0; i<arr.length; i++){
				var arr2 = arr[i].split("=");
				if(arr2[0] == name){
					return arr2[1];
				}
			}
			return "";
		},

		//设置cookie
		setCookie: function(){

		},

		//删除cookie
		delectCookie: function(name){
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			document.cookie = name + "=a; expires=" + date.toGMTString();
		}


	}
}