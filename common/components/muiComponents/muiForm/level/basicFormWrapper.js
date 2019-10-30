/**
 * 表单组件构造方法
 *
 * @author yangjinlai 2018-01-31
 *
 * 在这里执行表单的初始化处理，添加class控制样式，实例化内部的表单元素，
 * 绑定事件等
 *
 */



//引入创建详细对象的实例文件
import getFormRealObj from './getFormRealobj.js'

//引入生成dom结构的
import initDom from '../js/dom/initDom.js'


//表单组件的构造方法
var FormWrapper = function( i, el  ){

	//保存i 和 el
	this.i = i;
	this.el = el;

	//如果el.type没有值，默认为1
	if( !el.type ){
		this.el.type = 1;
	}

	//用来保存表单元素实例
	this.formArr = [];

}

FormWrapper.prototype = {

	//初始化
	init: function(){

		var that = this;

		//添加class的处理
		that.classInit();

		//实例化表单区域里的各个表单元素
		that.initForm();

		//将formArr return 出去
		return that.formArr;
	},

	//添加class的处理
	classInit: function(){
		var that = this;

		var length = $('.formDom').length;

		//每个表单都添加一个formName attr，唯一代表这个表单
        $(that.el.toNode).addClass('formDom').attr('formName','formWrapDom_'+ length)

        	//把表单放在form_row_right里
        	.append('<ul class="mui-table-view formUl"></ul>');

        //判断表单类型，给容器节点添加对应的class
        if( that.el.type == 1){
            //水平方向，如预约理财师--立即联系弹窗
            $(that.el.toNode).find('.formUl').addClass('type_1');
        }

	},

	//实例化表单区域里的各个表单元素
	initForm: function(){
		var that = this;

		//循环that.el.list
		$.each( that.el.list, function(index, list){

			//每一个list代表一个表单元素，生成对应实例
			var newObj = getFormRealObj( list );

			//将该实例添加到that.formArr中
			that.formArr.push(newObj);
		})

		//此时已经获取到了所有表单元素的配置，
		//循环that.formArr，生成dom结构并绑定事件等
		$.each( that.formArr, function( index, obj) {

			//调用initDom方法，传递toNode和options
			//该方法会生成dom结构并添加到页面上
			//并返回当前的表单元素
			var $last = initDom( that.el.toNode, obj);

			//如果当前是下拉列表，需要添加check属性
			//下拉列表统一只做是否为空的校验
			if( obj.opts.type == 'select' ){
				$last.find('input').attr('check', 'empty');
			}

			//currentEl表示当前的表单元素，即该实例对应的表单元素
			obj.currentEl = $last;

		})
	},

}

//导出FormWrapper
export default FormWrapper;