/**
 * 计算保费
 *
 * @author yangjinlai 
 */


//判断$el，根据不同情况调用getCalCulate
export default function( $el ){

	if( $el.parents('.czbzSection').length ){
		//是共享免赔额，循环所有被保人，每个表单发送一个请求
		var $changeArea = $('.bbxrxxSection .changeArea');
		$.each( $changeArea, function(i, t){
			//判断是否选择了被保人生日，只有选择了生日才计算
			if( !!$(t).find('[cardAttr="birth"] input').val()){
				getCalCulate( $(t) );
			}
		})
		
	}else if( $el.parents('.bbxrxxSection').length && !!$el.find('[cardAttr="birth"] input').val() ){
		//其他情况（在填写被保人表单）
		//因其他项都可以默认为否，所以这里只判断生日是否已选
		getCalCulate( $el );
	}
	
}


//保费合计的计算
function getAll(){
	var $c = $('.bbxrxxSection .changeArea:visible'),
		r = 0;
	$.each( $c, function(x, y){
		var $r = $(y).find('.secondItems .result');
		if( !!$r.html() ){
			r += Number($r.html().replace('￥', ''));
		}
	})
	r = String(r).indexOf('.') != -1 ? r : r + '.00';
	$('.fixedBottom .statusButton .status').html( '￥'+ r );
}


//计算保费的ajax请求
function getCalCulate($el){

	//防止多个区域同时请求时$el指向变化
	//使用闭包
	(function( $el){
		var obj = [{
			url: 'calculate_api',
			//async: false,
			//needLogin: true,
		    data:{
	        	//被保险人生日
	            birthday: $el.find('[cardAttr=birth] input').attr('num'),
	           	// 有无质子重离子治疗 0:否 1:是' 
	            proton: !!$el.find('[cardAttr=zhizi] input').attr('num') ? $el.find('[cardAttr=zhizi] input').attr('num') : 0,
	            //共享免赔额  0:否 1:是', ,
	            sharedDeductibles : !!$('.czbzSection input:visible').is(':checked') ? 1 : 0, 
	            //有无社保 0:没有 1:有'
	            socialSecurity: !!$el.find('[cardAttr=shebao] input').attr('num') ? $el.find('[cardAttr=shebao] input').attr('num') : 0
		    },
		    needDataEmpty: false,
		    callbackDone: function(json){

	    		//成功，设置结果
	    		var premium = json.data.premium,
	    			money = String(premium).indexOf('.') != -1 ? premium : premium + '.00';
	    		$el.find('.itemUl .result').html('￥'+ money);

	    		//计算保费合计
	    		getAll();
	    		
		    },
		    callbackFail: function(json){
		        //失败，保费改成0
		        $el.find('.itemUl .result').html('￥0.00');
		        //清空当前选择的日期
		        $.clearStates($el.find('[cardAttr=birth]'));
		        //重新计算保费合计
		        getAll();
		        //黑条提示
		        tipAction(json.msg);
		    }
			
		}]

		$.ajaxLoading(obj);
	})($el)
	

}