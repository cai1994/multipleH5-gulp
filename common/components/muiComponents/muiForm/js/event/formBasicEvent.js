/**
 * 绑定表单元素的默认事件
 *
 * @author yangjinlai 2018-03-31修改
 */


import staticData from '../config/staticData.js'

//引入下拉列表选择器
import popPicker from '../../../muiPop/popPicker.js'

import calcInsurance from '../../../../../js/calcInsurance'

import oConfig from '../../../../../../web/views/order/common/config/config'

import splitUrl from '../../../../../js/splitUrl'

var orderConfig = oConfig(splitUrl()['name']);

//性别
//初始化mui poppicker点击事件
mui("body").on('tap', '[cardAttr=gender]', function() {

    $('input,textarea').blur();

    popPicker({
       layer: 1, 
       pickerList: staticData.gender,
       source: $(this),
    } );
})

//出生日期
//初始化日期弹层
mui("body").on("tap", "[cardAttr=birth] .mui-input-row", function(e) {

	var $this = $(this);
	
    $('input,textarea').blur();

    if (!$this.hasClass('hasDisabled')) {
        var dtpicker = new mui.DtPicker({
            type: "date", //设置日历初始视图模式 
            beginDate: new Date("1901", "00", "01"), //设置开始日期 
            endDate: new Date(), //设置结束日期 
            labels: ['年', '月', '日'], //设置默认标签区域提示语 
        })
        dtpicker.show(function(selectItems) {
            $this.find('input').attr("num", selectItems.text).val(selectItems.text);
            dtpicker.dispose();
            //计算保费
            calcInsurance($this.parents('.changeArea'));
        })
    }


});

//职业
mui("body").on("tap", "[cardAttr=vocation] .mui-input-row", function(e) {

    var $this = $(this);
    
    $('input,textarea').blur();

    popPicker({
        layer: 3, 
        pickerList: staticData.vocation,
        source: $this.parents('li'),
        beforeGetData: function( result ){
            
            var r = result[result.length-1].text,
                returnR = true;
            if( !!r ){
                var num = r.substring( r.lastIndexOf('-') + 1 );
                if( num > 4){
                    //不符合1-4类，提示
                    $('.mui-poppicker').hide();
                    tipAction('职业限定1-4类', function(){
                        $('.mui-poppicker').show();
                    });
                    returnR = false;
                }
            }
            return returnR;
        },
    } );

});



//有无社保
mui("body").on("tap", "[cardAttr=shebao] .mui-input-row", function(e) {

    var $this = $(this);
    
    $('input,textarea').blur();

    popPicker({
       layer: 1, 
       pickerList: staticData.shebao,
       source: $this.parents('li'),
       callback: function(){
            calcInsurance($this.parents('.changeArea'));
       }
    } );



});

//质子重离子
mui("body").on("tap", "[cardAttr=zhizi] .mui-input-row", function(e) {

    var $this = $(this);
    
    $('input,textarea').blur();

    popPicker({
       layer: 1, 
       pickerList: staticData.zhizi,
       source: $this.parents('li'),
       callback: function(){
            calcInsurance($this.parents('.changeArea'));
       }
    } );

});

//关系
mui("body").on("tap", "[cardAttr=contact] .mui-input-row", function(e) {

    var $this = $(this);
    
    $('input,textarea').blur();

    popPicker({
       layer: 1, 
       pickerList: staticData.contact,
       source: $this.parents('li'),
       beforeSetData: function( picker, pickerObj ){
            //判断当前可选的关系
            var $b_c = $('.bbxrxxSection').find('[cardAttr=contact]:visible'),
                n_list = [],
                calObj = {
                    '本人': 0,
                    '父母': 0,
                    '配偶': 0,
                    '孩子': 0
                };

            $.each( $b_c, function( i, el){

                var $el = $(el),
                    num = $el.find('input').attr('num');

                if( !!$el.find('input').val() && !!num){
                    //如果已选
                    
                    //计算各类关系的数量
                    if( $.inArray( num , orderConfig.contact['本人']) != -1){
                        //有选本人
                        calObj['本人']++;
                    }
                    else if( $.inArray( num , orderConfig.contact['父母']) != -1) {
                        //属于父母
                        calObj['父母']++;
                    }
                    else if( $.inArray( num , orderConfig.contact['配偶']) != -1) {
                        //属于配偶
                        calObj['配偶']++;
                    }
                    else if( $.inArray( num , orderConfig.contact['孩子'] )!= -1) {
                        //属于孩子
                        calObj['孩子']++;
                    }
                }
            })

            //针对各类隐藏数据
            for( var x in orderConfig.contactMore ){

                if( calObj[x] >= orderConfig.contactMore[x] ){
                    n_list =  n_list.length ? util.objDeepCopy( n_list.filter(function(z){
                        return  $.inArray( z.value , orderConfig.contact[x] ) == -1
                    }) ) : util.objDeepCopy( pickerObj.pickerList.filter(function(z){
                        return $.inArray( z.value , orderConfig.contact[x] ) == -1
                    }) );
                }
            }
           
            //返回经过处理的新pickerObj
            //pickerList判断，如果n_list有长度，或者当前已经有了7个被保人(此时n_list长度应该为0)
            //使用n_list初始化picker，长度为0时，没有可选项
            return {
                layer: 1, 
                pickerList: n_list.length || $('.bbxrxxSection .changeArea').length == 7 ? n_list : pickerObj.pickerList,
                source: $(this)
           }
       }
    } );

});

//证件类型
mui("body").on("tap", "[cardAttr=idType] .mui-input-row", function(e) {

    var $this = $(this);
    
    $('input,textarea').blur();

    popPicker({
       layer: 1, 
       pickerList: staticData.idType,
       source: $this.parents('li'),
    });

});