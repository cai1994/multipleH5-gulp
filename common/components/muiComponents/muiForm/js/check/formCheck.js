/**
 * @author yangjinlai 2018-01-31
 * 
 * 表单校验事件
 *
 * 用于处理错误提示，去做校验及处理校验结果
 *
 * 离焦校验、短信验证码按钮点击时校验、checkInput()校验，都会调用本方法
 *
 *
 */

//引入xssFilter及配置
import xssFilter from 'xssfilter'
var xssfilter = new xssFilter({
    matchStyleTag: false,
    matchScriptTag: false,
    removeMatchedTag: false,
    escape: true
});

//表单元素的校验配置
import checkConfig from './checkList.js'

import regList from '../../../../../js/util/regList.js'

function doCheck( checkEl , val){

    //去做校验
    console.log('当前校验的是check为: ' +  checkEl.$el.attr('check') + ' 的表单元素');

    var type = checkEl.type,
        $this = checkEl.$el,
        parentsNode = checkEl.parentsNode,
        r = true;
    
    // if( type == 'select'){
    //     //下拉列表只校验是否为空
    //     if ( !checkConfig.checkFunc.isEmpty.call(this, val)) {
    //         //校验不通过，提示
    //         tipAction( $this.attr('errortip') );
    //         r = false;
    //     }
    // }
    if( $this.hasClass('check') ){
        //复选框是否已选择
        if( !$this.find('input').is(':checked') ){
            //校验不通过，提示
            tipAction( checkConfig.checkList[ $this.attr('check') ].tip );
            r = false;
        }
        else{
            //通过
            val = 'check';
        }
    }
    else{
        var clist = util.objDeepCopy( checkConfig.checkList[ $this.attr('check') ].checkEvent );

        //循环校验配置
        $.each( clist, function(index, list){

            //去做校验，传递这几个参数
            //val需要去掉逗号
            var result = list.type( val, $this, list.param );

            //判断校验情况
            if( !result ){

                //校验不通过
                r = false;

                //如果是下拉列表，errortip是配置在input上的
                if( type == 'select' ){
                    tipAction( $this.attr('errortip') );
                }
                else{
                    //其他，是配置在list.tip上的
                    tipAction(list.tip);
                }
                
                //跳出循环
                return false;
            }

        })
    }
    
    if( !r ){
        //有没通过校验的
        return false;
    }

    return val;
}

/**
 * 离焦校验、短信验证码按钮点击时校验、checkInput()校验，都会调用本方法
 *
 * checkEl: {
 *      type: 离焦时传'blur',
        $el: 该表单元素的.card-input-row,
        parentsNode: 校验区域
 * }
 */
export default function( checkEl ){

    //当前校验的表单元素
    var $el = checkEl.$el;


    //先获取表单元素的结果

    if( checkEl.type == 'select' ){
        //下拉列表
        var val = regList.removeComma( $el.attr('num') );
    }
   
    else if( !$el.hasClass('check') ){
        //其他情况，此时皆为可输入区域
        var val = regList.removeComma( $el.val() );
    }

    if( $el.attr('needCheck') == 'true'){
        //需要校验的，去校验
        var result = doCheck( checkEl, val );

        if( result === false ){
            //未通过校验，返回formCheckWrong，表示有错误
            return 'formCheckWrong';
        }
    }
    else{
        //不需要校验，直接使用val
        var result = val;
    }

    //result用xssfilter处理
    var f_result = $.trim(xssfilter.filter( result ) );

    var finalResult = {
        cardAttr: checkEl.$el.parents('li').attr('cardAttr'),
        result: f_result
    }

    //设置到final属性上，用于校验通过后，可以直接通过此属性获取数据
    checkEl.$el.parents('li').attr('final', f_result);

    return finalResult;
}

