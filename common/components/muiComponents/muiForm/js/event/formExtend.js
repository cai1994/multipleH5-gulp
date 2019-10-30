/**
 * 表单组件的扩展事件
 *
 * @author yangjinlai 2018-03-31修改
 * 
 * 校验表单 $().checkInput('')
 * 表单回显状态设置  $().setDisable()
 *
 * 具体说明如下：
 *
 * 
 * setDisable()为表单状态回显设置，使用方法：
 *
	 * 1）input输入框回显时，假设该输入框的class为.input，调用方式如下：
	 * 		$('.input').val(回显的数据).setDisable();
	 * 		
	 * 2）下拉列表回显时，假设该列表有class为.select
	 * 		$('.select li[num='+对应回显的数据+']').setDisable();
	 * 		
	 * 	  不是用下拉列表中的input调用，而是使用它的下拉列表中的li，选取num对应回显数据的那一条调用
	 * 	  在setDisable中，会用js模拟点击一下click()，这样就把数据设置到了input上
	 * 	  
	 * 3）日期回显
	 * 		由于日期选择框没有下拉列表那样的li，因此要用上面种类1的回显方式
	 * 		但它又跟下拉列表一样有num属性，提交给接口的是num属性值
	 * 		假设该input有class calendarinput，调用方式：
	 * 		$('.calendarinput').val(回显的文字).attr('num', 对应的num值).setDisable();
	 *
	 * 在setDisable()中，会添加回显的灰色底色
	 *
	 * 另外，可以给setDisable()传参数'change'，表示回显但可以修改
	 * 若传的不是change,或不传，则是回显不可修改
 * 
 */



//引入短信验证码相关方法
//本文件中只用到了其中的清除短信验证码方法
//var timeCountDown = require('../api/dxyzm/other/timeCountDown.js');

//引入做校验的方法
import getCheck from '../check/formCheck.js'

import stringUtil from '../../../../../js/util/stringUtil.js'


$.extend($, {

	/**
	 * 表单重置方法
	 * 重置表单到初始状态
	 */
	'clearStates': function(  $parentsNode ){

		var wForm = window.windowForm;

		var $input = $parentsNode.find('input');

		$.each( $input, function(i, el){
			var cAttr = $(el).parents('li').attr('cardAttr');
			if( !!cAttr ){
				//cardAttr可以唯一代表这个表单元素
				$.each( wForm, function( x, y){
					var isFind = y.formArr.filter(function(m, n){
						return m.opts.cardAttr == cAttr;
					})
					if( !!isFind.length ){
						//有cardAttr数据相等的，按照当前的配置，重置此表单
						//目前只重置num和val
						$(el).attr('num', isFind[0].num ? isFind[0].num : '').val( isFind[0].val ? isFind[0].val : '' );

					}
				})
			}
		})
	},

	/**
	 * 表单校验方法，外部可调用
	 * 
	 * 1. 参数parentsNode
	 * 		需要校验的范围，格式：'.***'或'#***'，可以直接使用$(parentsNode)取到DOM节点
	 * 		若没有传递，默认为body
	 * 		
	 * 2. 调用方式：$('***').checkInput(***);
	 * 		1)当点击按钮后使用本校验方法时，需要用按钮调用，如$('.btn').checkInput('.form')
	 * 		  这样方法里的$this就是这个按钮，用于显示对应位置的错误提示
	 * 		2)当直接使用本校验方法，而不是点击按钮触发时，因为此时通常是校验某些输入框的值，
	 * 		  因此错误提示是在输入框下方，不需要指定按钮位置，可以这么调用：
	 * 		  $('body').checkInput('.form');
	 * 		  $("body")可以不固定使用body，其他任意元素都可以
	 * 		  
	 * 3. 返回值result
	 * 	    包括了needCheck为true即需要校验的表单元素的结果
	 * 	    也包括needCheck为false即不需要校验的表单元素的结果（可以用来获取回显的数据）
	 * 	    但checkInput结构是特殊的：
	 * 	    	因为该结构里有两个input type=radio，不会有不选择的情况
	 * 	     	当需要显示输入框时，会根据needCheck情况校验输入框的值并返回，
	 * 	     	但不需要显示输入框时，不会校验，
	 * 	     	radio的选择情况请在页面js上自己判断
	 * 		
	 */
	'checkInput': function( $parentsNode){

		//判断parentsNode是否有值，如果没有，默认为$('body')
		$parentsNode = $parentsNode ? $parentsNode : $('body');

		// 这里判断是否是字符串，如果是，就作为jquery节点考虑
		if( util.getVarType.isString($parentsNode) == 'string'){
			//是字符串，重置为$(parentsNode)
			$parentsNode = $($parentsNode);
		}

		//获取parentsNode里，所有需要校验的元素
		var $all_1 = $parentsNode.find('[needCheck][check]:visible'),
			$all_2 =  $parentsNode.find('.bbxrxx [needCheck][check]:hidden'),
			$all = $all_1.concat($all_2);

		//resultArr用于保存校验结果
		var resultArr = [],
		//r用于保存校验状态，默认设置为true 
			r = true;

		//循环$all，开始状态判断和校验
		$.each( $all, function( index, el){

			//做校验
			var result =  getCheck( {
				type: $(el).parents('li').attr('type'),
				$el: $(el),
				parentsNode: $parentsNode
			});

			if( result == 'formCheckWrong' ){
				//未通过校验，跳出循环
				r = false;
				return false;
			}
			else{
				//通过校验，把结果添加进resultArr
				resultArr.push( result );
			}
		}) 

		if( !r ){
    		//有校验失败的元素
        	return false;
		}
		
		console.log( '校验结果：' + JSON.stringify( resultArr ) );

		//此时的resultArr包括了所有需要校验和不需要校验的表单元素的结果
		return resultArr; 

	},
})


/**
	 * 用于数据回显状态的设置
	 *
	 * 调用方式：
	 * 1. 使用容器节点如card-input-row
	 * $('.card-input-row').setDisable( val, type);
	 * 这种方式可以用于所有表单元素
	 *
	 * 2. 直接使用input调用
	 * $('***').setDisable(val, type);
	 * 这种方式用于表单元素的值固定设置的情况
	 * 
	 * @param  {[type]} type 有两种情况：1. change--可修改  2. !=change--不可修改
	 * @return {[type]} val ： 回显的数据
	 *                      input----val值
	 *                      下拉列表时：num值
	 *
	 * 调用此方法的时候，用每行的li去调用：$('[cardAttr=****]').setDisable(val, type);
	 */
$.fn.setDisable =function( val, num, type ){

	var $this = this;

	//先设置val
	$this.find('input').val(val);

	//如果是下拉列表，再设置num
	if( $this.attr('type') == 'select' ){
		$this.find('input').attr('num', num);
	}

	//type != 'change'时，表示当前回显数据不可修改，需要添加不可修改的样式
	//needCheck=false表示不需要做校验
	if( type != 'change' ){
		$this.find('input').attr('disabled', 'disabled').attr('needCheck','false');

		//如果是下拉列表的话，不可修改的情况下需要去掉箭头
		//给input外面的li加上一个hasDisabled
		if( $this.attr('type') == 'select' ){
			$this.addClass('hasDisabled');
		}
	}

	//使该方法可以链式操作，需要return this
	return this;
}