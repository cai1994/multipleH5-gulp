
<!-- 可展开收起的 一个区域-->
<template>
	<section class="openClose" :style="{display:display}">

		<div class="openCloseTitle" :style="{background: bgColor}" :class="!!borderBottom ? 'border-bottom' : '' ">
			<title-line :titleText="titleText" :titleClass="titleClass"></title-line>

			<!-- 展开收起的箭头 -->
			<vue-arrow v-if="!!show" :arrowStatus="arrowStatus" :clickFunction="clickFunction" ></vue-arrow>
			<!-- <span  class="arrow"  @click="change(active)"></span> -->
		</div>

		<!-- 展开收起按钮的操作区域 -->
		<div class="changeArea" ref="changeArea">
			<div class="areaMid">
        <!-- 普通列表 -->

				<vue-item v-for="itemsList in items" 
        v-if="itemsList.list.length" :items="itemsList.list" :itemsType="itemsList.itemsType" :paddingTopBottom="itemsList.paddingTopBottom"></vue-item>

        <!-- 表单 -->
        <vue-form  v-if="formData" :formData="formData" :formParam="formParam"></vue-form>
          
				<!-- 这里可添加其他html结构 
					可在外部作为变量插入，也可在页面打开后用js插入节点等方式
					但需要保证每一条都是li
				-->
			</div>

        <vue-item v-if="!!secondItems.length" v-for="itemsList in secondItems" 
             :items="itemsList.list" :itemsType="itemsList.itemsType" class='secondItems'></vue-item>

        <more-button v-if="!!buttonList.length" :buttonList="buttonList"></more-button>

		</div>
	</section>
	
</template>


<script>

//区域标题
import titleLine  from '../titleLine/titleLine'
//item
import vueItem  from '../item/item'
//箭头
import vueArrow  from '../arrow/arrow'
//表单
import vueForm  from '../form/form.vue'

import moreButton  from '../button/moreButton/moreButton'

//输出当前页面的组件
export default {
	name: 'openClose', 
	props: {
    //是否默认显示/隐藏
    //默认值为block----显示的
    //如传为none---隐藏 
    //此值作为style里的display样式，所以也可以传其他的display值
    display: {
      type: String,
      default: 'block'
    },
		//title部分的背景颜色，
		//默认透明
		bgColor: {
			type: String,
			default: 'transparent'
		},
    borderBottom: {
      type: [Boolean, String],
      default: false
    },
		//titleLine组件需要的参数，标题文字
		titleText: { 
			type: String, 
			default: '' 
		}, 
		//titleLine组件需要的参数，标题class
		titleClass: { 
			type: String, 
			default: '' 
		}, 
		//控制是否需要三角形展开收起的箭头
		//默认''---不需要，为show时需要
		show: {
			type: String,
			default: ''
		},
		//箭头样式
		// arrowType: {
		// 	type: String,
		// 	default: 'arrow'
		// },
		//控制展开收起的状态
		//默认为open，展开状态，如果为close，为收起状态
		status: {
			type: String, 
			default: 'open' 
		},
		//收起时，需要展示的items里的列表的索引+1，例[1,3,4]，即收起时展示第1、3、4条
		//默认[]，全部收起
		showList: {
			type: Array, 
			default: function () {
		        return []
		    }
		},
		//items的列表
		//可传参数：
		//[{
		//	txt: 该条item左边的文案
		//}]
		items: { 
			type: Array, 
			default: function () {
		        return []
		    }
		},
    secondItems: {
      type: Array, 
      default: function () {
            return []
        }
    },
    buttonList: {
        type: Array, 
        default: function () {
              return []
          }
        },
    //表单配置
    formData: {
        type: Array, 
        default: function () {
              return []
          }
    },
    // 表单赋值父元素
    formParam:{
      type:String,
    }

	},
    components:{
      	titleLine,
      	vueItem,
      	vueArrow,
        vueForm,
        moreButton
    },
    //有箭头的话，页面打开时执行一次
   //  mounted () {
   //  	if( !!this.show ){
   //  		this.clickFunc(e, 'init');
   //  	}
    	
  	// },
    data() {
      	return { 
      		arrowStatus: this.status ,
      		clickFunction: this.clickFunc,
      		itemsList: this.items
      	};
    },
    methods: {
    	//由arrow触发，点击切换展开收起状态
        clickFunc: function (e) {
          	var that = this,
          		//该箭头相关的操作区域
          		$changeArea = $(e.target).parents('.openClose');

          	var closeAction = function( that, $changeArea ){
          		//展开状态，需要收起
                
                //改变箭头方向为向下
                that.arrowStatus = 'close';
                //that.arrowType = 'down';

          		//获取$changeArea的本来高度并设置到$changeArea
          		//$changeArea.attr('minHeight', $changeArea.height());

          		if( !!that.showList.length ){
          			//showList有值
          			var lis = $changeArea.find('li');
          			$.each( lis, function(i, el){

                        var txt = $(el).find('.title .txt').length ? $(el).find('.title .txt').html() : $(el).find('.title').html();

          				if(  $.inArray( txt , that.showList) == -1 
                            //$.inArray( $(el).find('.title .txt').html(), that.showList) == -1 
                            //&& $.inArray( $(el).find('label').html(), that.showList) == -1 
                            ){
          					//that.showList中没有该元素
          					$(el).hide();
          				}
          			})
                    //隐藏mreButton结构
                    $changeArea.find('.moreButton').hide();
          			//固定该节点的高度
                    // var c_height = 0;
                    // $.each( $changeArea.find('.changeArea'), function(m, n){
                    //     c_height += $(n).height();
                    // })
          			$changeArea.height($changeArea.height());
          		}
          		else{
          			//没有值，全部收起
          			$changeArea.height( $changeArea.find('.openCloseTitle').height() );
          		}
          		//重设arrowStatus的值
          		

          	}


        	// if( type == 'init'){
        	// 	//页面打开初始化时，需要根据that.arrowStatus判断是否需要收起
        	// 	if( !!that.arrowStatus && that.arrowStatus != 'open' ){
        	// 		closeAction( that, $changeArea );
        	// 	}
        	// }
        	//else{
        		if( !!that.arrowStatus && that.arrowStatus == 'open' ){
        			closeAction( that, $changeArea );
        		}
        		else{
        			//收起状态，需要展开
                    
                    //改变箭头方向为向上
                    that.arrowStatus = 'open';
                   // that.arrowType = 'top';
                    //隐藏mreButton结构
                    $changeArea.find('.moreButton').show();
                    //展开全部高度
        			       $changeArea.css('height','auto').find('li').show();

                    //$changeArea.css('min-height', Number($changeArea.attr('minHeight')) );

                    //height( Number($changeArea.attr('maxHeight'))).find('li').show();
        			//重设arrowStatus的值
        			

        		}
        	//}

        	//设置最后一个li的marginBottom
        	that.marginBottomStyle(that.arrowStatus, $changeArea );
        },

        //设置最后一个li的marginBottom
        //用css无法获取到
        //所以用js
        marginBottomStyle: function( type, $changeArea ){

        	if( type == 'close'){
        		$changeArea.find('ul:visible').last().find('li:visible').last().addClass('marginBottom');
        		//.css('margin-bottom', 0);
        	}
        	else{
        		$changeArea.find('li').removeClass('marginBottom');
        	}
        	
        }
    }
}
</script>

<style lang="less">
@import './openClose.less';
</style>