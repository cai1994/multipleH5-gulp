<!-- 
	<check复选框  文字****   各种文档>  的结构

	如我已阅读并同意***
-->

<template>
	<div class="checkDoc">
		<div class="checkD">
			<check :checked="isCheck" needCheck="true" check="checked"></check>
			<div class="checkDocTxt">
				<span class='txt'>我已阅读并同意</span>
				<check-doc-html :htmlFile="htmlFile"></check-doc-html>
			</div>
		</div>
	</div>
</template>

<script>

//复选框
import check  from '../checkAndRadio/check/check'

import checkDocHtml  from './checkDocHtml/checkDocHtml'


export default { 
	name: 'checkDoc', 
	components:{
      	check,
      	checkDocHtml
    },
	props: {
		//设置check复选框是否默认选中
		//默认false--不选中
		isCheck:{
			type: [Boolean, String],
			default: false 
		},
		//我已阅读并同意后面的所需文档的链接dom结构是写死的
		//docHtml配置使用什么结构
		//默认''，此时没有任何结构
		//传html_1----为填写表单页面的那几个文档链接
		htmlFile: {
			type: String,
			default: '' 
		}
	},
}
</script>

<style lang="less">
@import './checkDoc.less';
</style>
