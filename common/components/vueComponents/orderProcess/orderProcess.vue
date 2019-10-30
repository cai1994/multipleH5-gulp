<!-- 
	四个步骤 圆点+中间的横线 
	外部调用时传入参数items
-->

<template>
	<section class="mui-content orderProcess">
		<ul class='mui-row clearfix'>
			<li v-for="item in items" class="mui-col-sm-3 mui-col-xs-3" :class='[item.active]'>
				<div>
					<span class="out"><span class="in"></span></span>
					
				</div>
				<p class='title'>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
export default { 
	name: 'orderProcess', 
	props: { 
		items: { 
			type: Array, 
			default: [] 
		}, 
	}
}
</script>

<style lang="less">
@import './orderProcess.less';
</style>
