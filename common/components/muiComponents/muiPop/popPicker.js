/**
 * 下拉列表，点击出现手机屏幕下方弹出滚动选择---太行项目特用--取值模式使用vue的
 * @author yangjinlai 2017-02-15
 * 
 * pickerObj：
 * layer--选择器的层级
 * pickerList--需要显示的数据，格式是已经处理好的
 * source--点击出现选择器的元素，用于显示选择后的数据及其他一些操作
 * beforeGetData----点击选择之前需要调用的方法
 * beforeSetData----初始化之前调用的方法
 * callback--选择数据后的回调函数，可用于显示数据或其他操作
 */

import calcInsurance from '../../../js/calcInsurance'

import assign from 'object-assign'

export default function( pickerObj ) {

    var $a = pickerObj.source.find('input');

    if ($('.mui-poppicker').length || pickerObj.source.hasClass('hasDisabled') ) {
        //不弹出，直接return false
        return false;
    }

    //执行beforeGetData
    var pick;
    if ( pickerObj.beforeSetData) {
        pick = pickerObj.beforeSetData(picker, pickerObj);
    }

    var pickerList = !!pick ? assign({}, pickerObj, pick) : pickerObj;

    //初始化
    var picker = new mui.PopPicker({
        layer: pickerList.layer, //层级数
        buttons: ['取消', '完成'], //选择器的取消、完成按钮的文案
    
        setValue: function() { //无需修改，选择器初始化后默认显示对应数据的代码

            if ( !!pickerList.source.find('input').val() ) {
                //此时已经回显了，且走到这里表示是可以点击的，点击出现
                //弹层并且定位到默认的数据上
                if (pickerList.layer > 1) {
                    //多级
                    for (var i = 0; i < pickerList.layer; i++) {
                        picker.pickers[i].setSelectedValue($a.attr('num_' + i));
                    }
                } else {
                    //单级
                    picker.pickers[0].setSelectedValue($a.attr('num'));
                }

            } else {
                //没有默认数据时
                for (var i = 0; i < pickerList.layer; i++) {
                    picker.pickers[i].setSelectedIndex(0);
                }
            }
        },
        addClass: function() { //无需修改，选择器注销后，按钮旋转的效果
            $a.removeClass('mui-active');
        }
  });

    
    

    //设置选择器的数据
    picker.setData(pickerList.pickerList);

    //选择器选择数据后的操作
    picker.show(function(getSelectedItems) {

        //选择的数据
        var result = getSelectedItems,
            str = '';

        //判断并执行beforeGetData
        var beforeResult = true;
        if ( pickerList.beforeGetData) {
            //重置beforeResult结果，需要在beforeGetData方法中返回
            //无返回时，beforeResult为undefined
            beforeResult = pickerList.beforeGetData(result);
        }

        if( !beforeResult ){
            //如果before不为true，不执行后面的逻辑
            return false;
        }


        //循环获取，并设置到对应的属性上
        $.each(result, function(i, el) {
            if( i == (result.length-1)){
                //只选取最后一项的数据
                if(!!el.text){
                    str += el.text;
                    $a.attr('num', el.value);
                }
                
            }
        })

        //如果有str，显示获取到的数据
        if( !!str ){
            $a.val(str);
        }
        
        //隐藏并注销选择器
        //picker.hide();
        //picker.dispose();
        //执行回调函数
        if ( pickerList.callback) {
            pickerList.callback(picker);
        }

    })

}
