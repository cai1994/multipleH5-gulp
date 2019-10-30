
var isChange = false;

require('../../web/include/vendor/zepto/data.js');
//引入页面高度变化的判断
require('../../web/include/vendor/resize/resize_zepto.js');

var bottomPosition = function (){

	if( isChange == true){
		return false;
	}
	isChange = true;

	if( $(".license").css('position') == 'fixed' ){
		if( !$('.fixedBottom:visible').length ){
			$(".license").css('padding-bottom', '0.3rem');
		}
		else{
			$(".license").css('padding-bottom', 0);
		}
		$('body').css('padding-bottom', 0);
	}
	else{
		$(".license").css('padding-bottom', 0);
		$('body').css('padding-bottom', $('.fixedBottom').height());
	}

	var w_height = $('.fixedBottom').length ? window.innerHeight - $('.fixedBottom').height(): window.innerHeight,
		f_height = $(".license").height(),
		f_top = $(".license").offset().top,
		b_height = $('body').height();


	if( $(".license").css('position') == 'fixed' ){

		isChange = false;
 
		//若body的高度+f_height没有超过w_height,return false
		if( ( b_height + f_height ) < w_height ){
			return false;
		}
		else{
			$(".license").css({
				'position': 'relative',
				'bottom': 0,
				'left': 0,
				'width': '100%'
			})
		}
	}
	else{
		//若body的高度+f_height超过w_height,return false
		isChange = false;

		if( ( f_top + f_height ) >= w_height ){

			return false;
		}
		else{
			$(".license").css({
				'position': 'fixed',
				'bottom': $('.fixedBottom').length ? $('.fixedBottom').height() : 0,
				'left': 0,
				'width': '100%'
			})
		}
		
	}



}


//页面打开时触发一次
$(function(){
	//当前页面上有此节点才执行此逻辑
	if( !!$('.license').length ){
	
		bottomPosition();

		//监听body节点的变化
		//变化后会再次触发
		$('body').bodyResize(function(e){
			bottomPosition();
		})
	}
	
})



// $('body').on('DOMsubtreeModified DOMAttrModified', function(e) {  

// 	bottomPosition();
	
// });  


//module.exports = bottomPosition;