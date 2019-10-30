/**
 * 生成表单dom结构
 *
 * @author yangjinlai 2018-03-20
 */


//引入表单元素初始化文件
//import setFormDeploy  from '../setFormDeploy.js'

/**
 * 生成表单元素的dom结构，进行初始化（生成下拉列表等）
 * 并返回一个当前的表单元素的jquery节点
 * 
 * @param  {string} toNode 表单元素所在的容器，（从业务js中一步步传过来的）
 * @param  {[type]} finalList  该条表单元素的实例配置  
 * @return {[type]} dom  [description] 该条表单元素的handlebars模板（未经过渲染的）
 */
export default function initDom ( toNode, finalList ){

    //表单容器
	var $wrap = $(toNode + ' .formUl');

    //dom已经在finalList中了，添加到页面上
    $wrap.append( '<li class="mui-table-view-cell border-bottom" type="'+ finalList.opts.type +'" cardAttr="'+ finalList.opts.cardAttr+'">' 
        + finalList.dom + '</li>');

    //选取当前表单内的最后一个元素（即当前插入的这个）
    var $last = $( toNode + ' .formUl li:last-child'); 

    //给label标签添加title class
    //与items组件统一  
    //用来在其他地方获取title里的文案
    $last.find('label').addClass('title');
   
    //判断该条表单元素在页面打开时是否隐藏
    if( finalList.display ){
        //需要隐藏
        $last.hide();
    }

    return $last;

}

