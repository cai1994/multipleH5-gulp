<!-- /**
 * 输入搜索框
 * @author  huarunsong 2019-02-21
 */
 -->

<template>
    <div class="form-wrap">
        <div class="mui-input-row">
            <div class="search flexbox">
                <div class="mui-icon searchicon mui-icon-search"></div>
                <input type="text" class="mui-input-clear flex1 searchInput" placeholder="请输入关键字" v-model="searchValue" maxlength="50" ><span class="mui-icon mui-icon-clear mui-hidden" ></span>
            </div>
        </div>
        <button type="button" class="mui-btn close" @click.stop="closeSearchBar()">取消</button>
    </div>
</template>
<script>

import './searchTopBar.less'

export default {
    name:'searchTopBar',
    props:{
      
    },
    data() {
        return {
            searchValue:null   
        };
    },
    created () {
        this.$nextTick(()=>{

            mui(".mui-input-clear")[0].addEventListener('focus', () => {
                mui(".mui-icon-clear")[0].addEventListener('tap',() => {
                     this.$emit('clearSearchBar');
                });

            });
       
        })
    },
    methods:{
        closeSearchBar(){
            this.$emit('closeSearchBar');
            this.searchValue = null;
        },
    },
    watch:{
        "searchValue":function(val){
                this.$emit('changeSearchValue',val);
        }
    }
}
</script>

