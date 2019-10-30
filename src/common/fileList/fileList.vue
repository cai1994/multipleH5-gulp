<!-- 
附件列表 
图标的类型需要通过截取名字的后缀 

-->
<template>
    <div>
        <ul class="fileListBox">
            <li class="accessory_common clearfix" v-for="item in fileData" :key="item.id" @click="down(item.id,item.fileName)">
                <div v-if="fileParseType(item.fileName)" class="icon icon_pos_xls"></div>
                <h2>{{item.fileName}}</h2>
            </li>
        </ul>
    </div>
</template>
<script>
import "./fileList.less"
import "./icon.less"
export default {
    name: 'fileList',
    props: ['fileData'],
    methods: {
        //文件类型转换
        fileParseType: function(fileName) {
            var fileType = fileName.split('.')[1];
            return fileType;
        },
        down: function(id,fileName) {
            this.$emit("downFile", id,fileName);
        }
    }
}

</script>
