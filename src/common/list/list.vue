<!-- /**
 * list列表组件
 * @author  yangjinlai 2019-02-20
 */
    
    传list，list是一个数组，有几条列表就传几条，表示这一条的icon(位置在左边)和文案
    icon: 左边是icon时
    img:  左边是图片时
    txt:  左边是文字时传递
    name: 右边文案    
    clickFunc：用于点击时调用

    还有一个clickFunc方法，用于点击时调用

    list：
    [{
        icon: '',
        name: '',
        clickFunc: function(){} 
    },{
        img: '',
        name: '',
        clickFunc: function(){} 
    }]

    icon需要传symbol模式的

    type默认为空，name文字是靠左的，如果type传'rightSide'，name会靠右
 -->
<!-- list列表 -->
<template>
    <section class="listWrap" :type="type">
        <ul>
            <li v-for="l in list" @click="actionFunc(l.clickFunc)">

                <!-- 左边是icon -->
                <svg class="iconsvg" aria-hidden="true" v-if="l.icon">
                    <use :xlink:href="l.icon"></use>
                </svg>

                <!-- 左边是图片 -->
                <img :src="l.img" alt="" v-if="l.img" class="iconImg">

                <!-- 左边是文字 -->
                <span v-if="l.txt" class="iconTxt">{{l.txt}}</span>

                <!-- 右边的文字 -->
                <i class="name" >{{l.name}}</i>
            </li>
        </ul>
    </section>
</template>
<script>
import './list.less';
export default {
    name: 'list',
    props: {
        list: Array,
        type: { 
            type: String, 
            default: ''  //默认为空，不选中
        },
    },
    data() {
        return {}
    },
    methods: {
        actionFunc: function(callback) {
            //触发父组件的clickFunc方法
            
            if( !!callback ){
                callback();
            }
            //
            //this.$emit('clickFunc');
        }
    }

}

</script>
