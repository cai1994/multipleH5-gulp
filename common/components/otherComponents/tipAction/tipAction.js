/**
 * 黑色提示条的显示和隐藏
 * @author yangjinlai  2017-02-16
 */

//这里已经将html结构代码生成并插入到页面上，所以页面代码中不需要加这一段结构
var html = '<div class="tipAction"><p class="txt"></p></div>'; 

if($('body').find('.tipAction').length == 0){
	$('body').append(html);
}

//msg为黑色提示条需要显示的文案
//callback为倒计时2s后，黑色提示条隐藏，需要执行的回调函数
export default function( msg, callback, time){
	var time = time || 3000;
	$('.tipAction').show().find('.txt').html(msg);
	setTimeout(function(){
        $('.tipAction').hide();
        
        if ( callback ){
        	callback();
        }
        
    }, time);
}

