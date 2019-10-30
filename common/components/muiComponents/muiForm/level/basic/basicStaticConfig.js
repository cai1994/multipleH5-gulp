/**
 * 表单元素的最基本设置
 *
 * @author yangjinlai 2018-04-13
 */

var Static = function( opts ){

	this.opts = opts;

	this.dom = require('html-loader!./dom/'+opts.type+'/'+ opts.fileName+'.html') ;
}

//表单元素的基本事件
Static.prototype = {


	//初始化一个表单元素,生成dom结构并插入到页面上
	init: function(){

		//此时的that指调用本方法的实例对象
		var that = this;

		return that;

	},

}

export default Static;

