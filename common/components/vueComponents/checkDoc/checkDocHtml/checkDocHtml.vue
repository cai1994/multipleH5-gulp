<!-- 
	<check复选框  文字****   各种文档>  的结构

	如我已阅读并同意***
-->

<template>
	<div v-if="!!htmlFileName" v-html="htmlFileName" class="checkDocDiv"></div>
</template>

<script>
// 引用截取路径参数组件
import arg from '../../../../js/splitUrl.js'

export default { 
	name: 'checkDocHtml', 

	props: {
		//我已阅读并同意后面的所需文档的链接dom结构是写死的
		//docHtml配置使用什么结构
		//默认''，此时没有任何结构
		//传html_1----为填写表单页面的那几个文档链接
		htmlFile: {
			type: String,
			default: '' 
		}
	},
    data(){
    	return {
    		htmlFileName: !!this.htmlFile ? require('html-loader!./html/'+this.htmlFile+'.html') : ''
    	}
    },
    mounted(){
    	//设置投保须知的链接
    	$('.tbxz a').attr('href', '/about/readFile?file=tbxz&productId=' + arg()['productId'] );

    	//设置保障条款的链接
    	$('.bxtk a').attr('href', '/about/readFile?file=bxtk&productId=' + arg()['productId'] );
    	
    	
    }
}
</script>
