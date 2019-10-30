<!-- 
	item条目 vue组件
	左面为此条的名称，右面为内容
	如投保详情-保障计划
	
	@author yangjinlai 2018-07-31

	item.show 
	因css里么有:visible选择器，这里使用show判断该li是否为显示状态
	默认show
	如果不为show，表示该li此时是隐藏状态，
	用来css里控制显示的最后一条li的margin-bottom
-->

<template>
	<ul class='itemUl' :class='[itemsType]'>

		<li v-for="item in items" :style="TopBottom" :class="itemsType == 'type_1'? 'border-bottom' : ''">
			
			<!-- 左边的文案 -->
			<div class="title">
				<p class="txt" v-html="item.txt"></p>
				<p v-if="!!item.subTxt" class="subTxt">
					<span v-html="item.subTxt"></span>
					<span v-if="!!item.subTxtIcon" class="iconfont" v-html="item.subTxtIcon" :class="item.subTxtIconClass"></span>
				</p>
			</div>

			<!-- 右侧，check复选框和span二选一 -->

			<!-- 不需要check复选框 -->
			<span v-if="!item.resultCheck" :class="[item.blue == 'blue' ? 'blue result' : 'result']" @click="[item.reservationId ? clickFun(item) : '']"  >{{ item.result }}</span>

			<!-- 需要check复选框  -->
			<check v-if="!!item.resultCheck" :needCheck="item.resultCheck.needCheck" :check="item.resultCheck.check" :errorTip="item.resultCheck.errorTip" :checkClickFunc="item.resultCheck.checkClickFunc"></check>

		</li>
	</ul>
</template>

<script>

//复选框
import check  from '../checkAndRadio/check/check'


export default { 
	name: 'vueItem', 
	components:{
      	check,
    },
	props: {
		//循环的数组
		//可传参数：
		//items.txt---标题
		//items.subTxt----副标题（小字），如果不传，不会显示此结构，传了才有
		//result----结果
		items: { 
			type: Array, 
			default: [] 
		}, 
		
		//列表的样式类别
		//默认type_1，有下划线，高度为0.98rem
		//type_2时，无下划线，每行间距为0.3rem
		itemsType:{
			type: String, 
			default: 'type_1'
		},
		//每一个li的行内的上下边距
		paddingTopBottom: {
			type: String, 
			default: '0.3'
		}
	},
	methods: {
		clickFun: function(item) {
			window.open(site_api.getElectronicPolicy_param.url + "?reservationId=" + item.reservationId + "&policyId=" + item.result)
		},
	},
	data(){
		return {
			TopBottom : this.itemsType != 'type_2' ? 'padding-top:'+this.paddingTopBottom+'rem;padding-bottom:'+this.paddingTopBottom+'rem;' : ''
		}
	}
}
</script>

<style lang="less">
@import './item.less';
</style>
