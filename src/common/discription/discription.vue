<!-- /**
 * 描述文字段落
 * @author yangjinlai 2019-05-13
 -->
<template>

    <p class="description">{{discriptionTxt}}</p>

</template>
<script>
import "./discription.less";

export default {
    name:'discription',
    props:{
        discriptionTxt: { 
			type: String, 
			default: ''  //默认为空，不选中
		}, 
    }
}
</script>

