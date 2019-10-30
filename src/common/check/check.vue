<!-- /**
 * 单选
 * @author yangjinlai 2019-05-13
 *
 * 默认是否选中  用checked控制，默认为空，不选中，如传'checked'，则选中
 -->
<template>

    <div class="checkBox">    
        <input type="checkbox" :checked="checked">
        <label class="iconfont"></label>
    </div> 

</template>
<script>
import "./check.less";

export default {
    name:'bottomFixedButton',
    props:{
        checked: { 
			type: String, 
			default: ''  //默认为空，不选中
		}, 
    }
}
</script>

