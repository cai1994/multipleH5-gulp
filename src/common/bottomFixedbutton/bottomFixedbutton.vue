<!-- /**
 * 底部按钮
 *
 * @author yangjinlai 2019-05-14
 * 
 * 有一个按钮和两个按钮的情况
 *
 * 一个按钮：不要传twoButton，需要传btnText，父组件需要有 clickbottomFixedBtn方法，作为点击按钮时调用的方法
 *
 * 两个按钮：需要传twoButton（任意文案，建议传'true'）和twoButtonList，twoButtonList格式如下：
 *  //twoButtonList: {
    //  left: {
    //     txt: '',
    //     clickFunc: function(){……}，
    //     isDisabled： 'disabled'
    //  },
    //  right: {
    //     txt: '',
    //     clickFunc: function(){……},
    //     isDisabled: ''
    //  }
    //}

    type为按钮样式类别（圆角、颜色等），具体见bottomFixedBtn.less中说明
 * 
 -->
<template>
    <div class="footer">

        <!-- 如果twoButton为true，显示两个按钮 -->
        <div class="twoButton" v-if="twoButton">
            <input type='button' class="leftButton" @click="leftClick( twoButtonList.left.clickFunc )" :value="twoButtonList.left.txt" :disabled="twoButtonList.left.isDisabled" :btnType="twoButtonList.left.type">
            <input type='button' class="rightButton" @click="rightClick( twoButtonList.right.clickFunc )" :value="twoButtonList.right.txt" :disabled="twoButtonList.right.isDisabled" :btnType="twoButtonList.right.type">
        </div>

        <!-- 否则为1个按钮 -->
        <button class="bottomFixedBtn" v-if="!twoButton" @click="clickbottomFixedBtn()">{{btnText}}</button>
    </div>
</template>
<script>
import "./bottomFixedbutton.less";

export default {
    name:'bottomFixedButton',
    props:{

        //一个按钮时的按钮文案
        btnText: { 
			type: String, 
			default: '' 
		}, 

        //一个按钮时 ，控制是否可点击
        // isDisabled: { 
        //     type: String, 
        //     default: '' 
        // }, 

        //按钮样式类别
        type: {
            type: String, 
            default: '' 
        },

        //用于判断展示两个按钮还是一个按钮
        twoButton: { 
            type: String, 
            default: '' 
        }, 

        //两个按钮时的文案, 分别用left和right 表示，
        //twoButtonList: {
        //  left: {
        //     txt: '',
        //     clickFunc: function(){……}，
        //     isDisabled： 'disabled'
        //  },
        //  right: {
        //     txt: '',
        //     clickFunc: function(){……},
        //     isDisabled: ''
        //  }
        //}
        twoButtonList: {}
    },
    methods:{

        //一个按钮时的点击方法
        clickbottomFixedBtn(){
            if( $(event.target).attr('disabled') != 'disabled'){
                //可点击，触发父组件的clickbottomFixedBtn方法
                this.$emit('clickbottomFixedBtn');
            }
            
        },

        //两个按钮时的点击方法--左边按钮
        leftClick( callback ){
            (!!callback) && (callback());
        },  

        //两个按钮时的点击方法--右边按钮
        rightClick( callback ){
            (!!callback) && (callback());
        }
    }
}
</script>

