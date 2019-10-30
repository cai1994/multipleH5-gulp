/**
 * mui 回到顶部
 */

//初始化上拉下拉事件监听
mui.init({
    gestureConfig:{
	   swipeup: true, //默认为true
	   swipedown: true, 
    }
});


//监听按钮的点击动作
mui("body").on('tap', '.goTopBtn', function(){

    $(this).siblings('.tableList')[0].style.webkitTransform="translate3d(0px, 0px, 0px) translateZ(0px)";
    $(this).siblings('.tableList')[0].style.webkitTransform='2500ms';

    $(this).hide();
});

