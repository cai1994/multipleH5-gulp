<!-- /**
 * 单选
 * @author yangjinlai 2019-05-13
 *
 * 默认是否选中  用checked控制，默认为空，不选中，如传'checked'，则选中
 -->


<template>
    <div class="radioBox">    
        <input type="radio" :checked="checked" :name="radioName">
        <label class="iconfont"></label>
    </div> 

</template>
<script>
import "./radio.less";
 
export default {
    name:'bottomFixedButton',
    props:{
        radioName: {
			type: String, 
			default: 'radio'  //默认为radio
		},
        // checked: {
        //     type: String, 
        //     default: ''  //默认为radio
        // }
    },

    data() {
    	return{
	        isChecked: '', //默认为空
            checked: ''
	    };
    },

    watch : {

        //监听isChecked，改变checked状态
        isChecked : {
            handler(newName, oldName){
                //改变时调用changeButton
                this.checked = newName ;
            }
        }
    }

}
</script>

