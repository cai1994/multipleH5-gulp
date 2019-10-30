<template>
  <div class="contentBg">
    <div class="boxCon">
      <div class="tktopCon">确认反馈</div>
      <div class="evaluateCon">
        <h2>{{titleText}}<span>(必填)</span></h2>
        <ul class="scoreList">
          <li class="clearfix" v-for="item in activityGrade" :key="item.no">
              <div class="scoreL">{{item.name}}</div>
              <div class="scoreR">
                <span class="iconfont icon-xingji" v-for="n in 5" :key="n"   @click="selectNum(item.no,n,titleText)" :class="{'light':item.value >= n}">&#xe601;</span>
              </div>
          </li>
        </ul>
        <div class="write">
          <div class="tip" v-if="showTip" @click="showText()">请填写您的评价与建议(不必填)…</div>
          <textarea name="" id="" cols="30" rows="5" maxlength="200" autofocus="autofocus" v-model="textValue" v-focus v-if="showTextarea" @blur="emptyCon()"></textarea>
        </div>
        <div class="saveBtn" @click="save()">保存</div>
      </div>
      <div class="close" @click="hideTk()"></div>
    </div>
  </div>
</template>

<script>
import tipAction from "../../../common/components/otherComponents/tipAction/tipAction"
export default {
  props:{
    titleText:{
      type:String,
      default:"活动评价"
    },
    activityGrade:{
      type:Array,
      default:function(){
        return [
                  {name:"活动形式",no:1,value:0},
                  {name:"活动安排",no:2,value:0},
                  {name:"活动效果",no:3,value:0},
                  {name:"专业度",no:4,value:0},
                  {name:"帮助程度",no:5,value:0},
                ]
      }
    }
  },
  data(){
    return{
      showHide:false,
      showTextarea:false,
      showTip:true,//是否展示输入框提示语
      textValue:null
    }
  },
  methods:{
    //关闭弹框
    hideTk(){
      this.$emit('hideTkValue',this.showHide);
    },
    //是否展示输入框提示语
    showText(){
      this.showTextarea = true;
      this.showTip = false;
    },
    //光标离焦时事件
    emptyCon(){
      if(this.textValue == null){
        this.showTextarea = false;
        this.showTip = true;
      }else{
        this.showTextarea = true;
        this.showTip = false;
      }
    },
    //评分事件
    selectNum(no,num,str){
      if(str == "陪访评价"){
        for(let i=0;i<this.activityGrade.length;i++){
          if(this.activityGrade[i].no===no){
            this.activityGrade.splice(i,1,{name:"陪访评价",no:1,value:num});           
          }
        }
      }else{
        for(let i=0;i<this.activityGrade.length;i++){
          if(this.activityGrade[i].no===no){
            if(i == 0){
              this.activityGrade.splice(i,1,{name:"活动形式",no:1,value:num});
            }else if(i == 1){
              this.activityGrade.splice(i,1,{name:"活动安排",no:2,value:num});
            }else if(i == 2){
              this.activityGrade.splice(i,1,{name:"活动效果",no:3,value:num});
            }else if(i == 3){
              this.activityGrade.splice(i,1,{name:"专业度",no:4,value:num});
            }else if(i == 4){
              this.activityGrade.splice(i,1,{name:"帮助程度",no:5,value:num});
            }
          }
        }
        
      }
      
    },
    //保存反馈
    save(){
      //不评价时提示语
      for(let i=0;i<this.activityGrade.length;i++){
        if(this.activityGrade[i].value == 0){
          tipAction("请完成评价！");
          return;
        }
      }
      if(this.textValue == null){
        this.$emit("save",{
          'evaluateData':this.activityGrade,
          'hideTkValue':this.showHide,
          'adviceData':'无'
        })
      }else{
        this.$emit("save",{
          'evaluateData':this.activityGrade,
          'hideTkValue':this.showHide,
          'adviceData':this.textValue
        })
      }
      
    }
  },
  //blur方法
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }

  }
}
</script>


<style lang="less">
@import "./feedbackAffirm.less";
</style>

