/**
 * 表单组件的入口文件
 *
 * @author yangjinlai 2018-01-31
 *
 * 表单初始化的时候使用，一个页面上引入后可以调用多次
 *
 * 引用方式：require('../../../../common/components/form/form.js')(formList);
 *
 * 在form.js中，导出了一个方法：initForm()，formList就是传递给该方法的参数，
 * 格式为[{}, {}, {}, ……]
 *
 * 该数组表示一个表单，每一条对象{}都代表一个表单（确切地说，是一个区域）
 *
 * {}里需要三个数据：toNode(str)，type(num/str)，list(arr)
 * 
 * 如：
 *
 * var formList = [{
 * 		toNode: str,
 * 		type: '',
 * 		list: arr
 * },{
 * 		toNode: str,
 * 		type: num,
 * 		list: arr
 * },
 * ……]
 *
 * toNode —— 必传（字符串格式），表单所在的容器的class或id值，需要带上.或者#，即'.***'或'#***'，可以多层嵌套，
 * 			代码中能够直接使用$(toNode)获取到该容器节点即可
 * 			
 * type —— 可选，表单类型，可传值为''/2/3（字符串或数字格式皆可），分别给表单添加不同的样式，说明如下：
 *
 * 			表单默认样式为表单元素竖直排列，label和input也竖直排列，宽度跟随父元素宽度变化
 * 			（type不传，或传递的数值不为2/3时，皆为此默认样式）
 *
 * 			在此基础上，type如传递：
 * 
 * 			2--竖直+水平，表单元素竖直排列，表单元素内的label和input水平排列，input部分的宽度默认为300px, 
 * 				如理财师-立即联系弹窗上的表单
 * 				
 * 			3--水平，表单元素水平排列，表单元素内的label和input也水平排列，无默认宽度，
 * 				实际宽度需要在页面less文件中设置，如完善账户信息弹层上的表单
 * 				
 * list —— 必传（数组），该表单内需要的表单元素的集合，格式：[{}, {}, {}, ……]，每一条{}都表示一个表单元素
 * 			{}里需要的属性如下：
 *
 * 				fileName -- 必传，该表单元素的类型
 * 				name -- 必传，该表单元素的名字（用label标签内的文案作为名字）
 * 				……
 * 				其他属性为可选，根据实际情况传递，如colon，star， labelShow等，具体见对应文件的注释
 *
 * 				特别地：
 * 					短信验证码时，必传一个属性为checkArea，表示点击此短信验证码时需要校验的元素的范围，
 * 					格式同toNode一样，为该范围容器的class或id值，需要带上.或者#，即'.***'或'#***'，
 * 					可以多层嵌套，代码中能够直接使用$(toNode)获取到该容器节点即可
 *
 * 
 * 在initForm()中，循环formList数组，把list中的表单元素插入到toNode所标记的表单区域内
 *
 * 这样就在不同区域生成了需要的表单
 *
 * 一个表单区域里有几条表单元素，list数组中就有几条对象
 * 但若一个表单有二级区域，且需要在接口中取得数据，不需要配置在list中
 * 
 *
 * 在本文件中，除了实例化表单，还为表单组件添加了扩展方法，
 * 详见'./js/event/formExtend.js'
 *
 */


//引入表单组件构造方法
import FormWrapper from './level/basicFormWrapper.js'

//引入表单组件基本方法
import './js/event/formBasicEvent.js'

//引入表单组件的扩展方法
import './js/event/formExtend.js'

//声明windowForm，作为当前页面上所有表单实例的集合
window.windowForm = [];

export default function initForm( formList ){

	//循环formList
	$.each( formList, function( i, list ){

		//每一条el是一个表单区域的配置，针对此区域生成一个表单实例
		var form = new FormWrapper( i, list );
		
		//初始化，调用init()
		form.init();

		//将form添加进windowForm，保存起来
		window.windowForm.push( form );

	})
}





