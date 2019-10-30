/**
 * 项目一些基本需要的全局设置
 * 
 * 浏览器版本判断
 *
 * 在header.js中引用
 * 
 * @author yangjinlai 2018-03-27
 */


/**
 * ajaxSetting，
 * 用于设置一些ajax请求需要的配置
 * 及浏览器是否为ie，ie的版本
 * @type {[type]}
 */
$.extend($,{
	'ajaxSetting': {
		//ajax请求需要的配置
		contentType: config.env != 'local' ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
    	needJSON : config.env != 'local' ? true : false,
    	//浏览器是否为ie
    	//browserVersion: ieBrowser ? true: false,
    	//ie版本号
    	//IEVersion: v
	}
})



