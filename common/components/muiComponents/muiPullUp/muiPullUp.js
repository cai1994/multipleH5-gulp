/**
 * mui上拉加载组件
 * 
 */


require('../muiGoTop/muiGoTop.js');


function muiPull( $dom, callback){

	//$dom和callback是外面传进来的参数
	this.$dom = $dom;
	this.callback = callback;

	//当前页的页码，默认为0
	//this.page = 0; 
	//用于保存初始化后的mui pullRefresh callback方法里的当前对象(t)
	//在dataDeal方法中使用
	this.muiPullCurrent = null; 
}

muiPull.prototype = {

	//初始化方法
	initPull: function(){

		var that = this;

		var $list = that.$dom.find('.mui-scroll');

		$list.append('<ul class="tableList"></ul>');

		that.tableListLength = $('.tableList').length - 1 ;

		//pageNum是当前页码
		//index是对应的tab的索引
		//tableList可以唯一代表当前这个mui-scroll上拉区域
		$list.attr('id', 'tableList_' + (Number( that.tableListLength ))).attr('index', (Number( that.tableListLength )));
			//.attr('pageNum', this.page);

		//设置PullList的高度并增加点击回到顶部的按钮
		var h = document.documentElement.clientHeight - $list[0].getBoundingClientRect().top;
		$list.height( h ).append('<div class="goTopBtn iconfont"></div>');

		that.$dom.append('<div class="noDataInfo"><div class="noDataInner"><img src="/fc/static/img/noData.png" /><p>暂无数据</p></div></div>');

		$list.parents('.mui-slider-group').height(h);

		//要保存到that上，其他两个方法中使用
		that.$list = $list;

		that.initMui();
	    
	},

	//初始化Mui的部分
	initMui: function(){

		var that = this;

		//在这里重置页码
		that.page = 0; 

		that.$list.attr('pageNum', this.page);

		

		mui.init({
			pullRefresh: {
				container: that.$list ,
				// down: {
				// 	contentrefresh: '拼命加载中',
				// 	contentnomore:'没有更多了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			 //        callback : function(){

			 //        	that.muiPullCurrent = this;

			 //        	console.log( 1 );  

			 //        	//执行callback
				// 		//that.callback && that.callback( $(this.wrapper));
			 //        }
				// },
				up: {
					//auto: false,
					contentrefresh: '拼命加载中',
					contentnomore:'没有更多了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			        callback : function(){

			        	that.muiPullCurrent = this;

			        	//执行callback
						that.callback && that.callback( $(this.wrapper.parentNode));
			        }
				}
			}
		});

		//init后需要执行ready函数，才能够初始化出来
	    mui.ready(function() {

	    	//隐藏当前的加载中loading
        	if( !that.$dom.hasClass('hasPullUp') ){
        		that.$dom.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
        	}

	    	//这一句初始化并第一次执行mui上拉加载的callback函数
	    	// if( mui( '#'+ that.$list.attr('id') ).pullRefresh() ){
	    	// 	//已经有了
	    	// 	mui( '#'+ that.$list.attr('id') ).pullRefresh().refresh(true);
	    	// }
	    	// else{

	    	// }
	    	mui( '#'+ that.$list.attr('id') ).pullRefresh().pullupLoading();
	      	

	      	//为$id添加hasPullUp  class
	      	that.$dom.addClass('hasPullUp');
	    });

	    //触发第一次上拉加载
	    //mui('#tableList_' + that.tableListLength).pullRefresh().pullupLoading();

	},

	//处理data的数据，在外部请求接口后调用
	//type--0, 接口成功
	//type--1，接口失败
	//type--2，接口成功，但数据已不够一屏，不可再继续上拉
	//type--3，重置当前上拉区域
	dataDeal: function( type){

		var that = this;

		if( type == 0){
			//接口成功，且有数据，可以继续上拉
			that.muiPullCurrent.endPullupToRefresh(false);
			//当前页码+1
			that.page++;
			that.$list.attr('pageNum', that.page);
			//去掉mui-pull-bottom-pocket的mui-hidden
		    that.$dom.find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
		}
		else if( type == 1){
			//接口失败，但还可以继续上拉
			that.muiPullCurrent.endPullupToRefresh(false);
		}
		else if( type == 2){
			//接口成功且不可继续上拉（数据已不够一屏）
			that.muiPullCurrent.endPullupToRefresh(true);
			//that.$dom.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
		}
		else if( type == 3){	

			//再重置上拉加载
			mui( '#'+ that.$list.attr('id') ).pullRefresh().refresh(true);

			//销毁当前区域，重新请求数据
			//that.muiPullCurrent.endPullupToRefresh(false);
			that.page = 0;
			
			//先清空列表
			that.$list.find('.tableList').find('li').remove();
			
			that.$dom.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
			//重新初始化
			that.initMui();
			//滚动回顶部
			mui( '#'+ that.$list.attr('id') ).pullRefresh().scrollTo(0,0,0);
		}
	},

	// //销毁对应区域，但不重新请求数据
	// destroyObj: function( t){
	// 	//销毁当前区域，重新请求数据
	// 	t.muiPullCurrent.endPullupToRefresh(true);
		
	// 	//先清空列表
	// 	t.$list.find('.tableList').find('li').remove();
	// 	//再重置上拉加载
	// 	//mui( '#'+ t.$list.attr('id') ).pullRefresh().refresh(true);
	// 	t.$dom.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
	// 	//去掉hasPullUp
	// 	t.$dom.removeClass('hasPullUp');
	// }

}	


//dom--上拉加载组件的dom容器
//callback--上拉后的回调函数
module.exports = function( $dom, callback ){

	//初始化一个示例并调用init方法
	var pull = new muiPull($dom, callback);
	pull.initPull();
	
	return pull;
}