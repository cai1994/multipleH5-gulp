<!-- 入口
	客户陪访 -点击进入客户陪访页面 
	活动培训 -点击进入活动培训页面

	@author yangjinlai 2019-02-20
-->

<template>
	<div class="indexList">
	 	<list :list="list" ></list> 
	</div>
</template>


<script>

	//引入list组件
	import list from '@src/common/list/list'

	export default {
	    name: "fcIndex",
	    components:{
	        list
	    },
	    data() {
	        return {
	            list: [
	                {
		                icon: '#icon-ziyuan3',
		                name: '客户陪访',
		                clickFunc: function(){
		                	//跳到客户陪访页面
		                	window.location.href = goUrl.customerListUrl;
		                }
	                },
	                {
		                icon: '#icon-ziyuan4',
		                name: '活动/培训',
		                clickFunc: function(){
		                	//跳到活动/培训页面
		                	window.location.href = goUrl.activityListUrl;
		                }
	                }
	            ]
	        };
	    }
	}


</script>

