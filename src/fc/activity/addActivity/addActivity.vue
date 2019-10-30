<template>
    <div class="pageWrapperAdd">
        <ul class="list">
            <li class="item">
                <label class="lb">活动/培训名称</label>
                <input v-model="formData.activityName" class="ipt" type="text" placeholder="请输入" maxlength="80" />
            </li>
            <li class="item itemSelect">
                <label class="lb">举办时间</label>
                <span  :class="formData.holdTime ? 'placeholder' : 'placeholder tipCor'" @click="openDtPicker()">
                    <template v-if="formData.holdTime">
                        {{formData.holdTime}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward"  @click="openDtPicker()"></i>
            </li>
            <li class="item">
                <label class="lb">举办地点</label>
                <input v-model="formData.holdPlace" class="ipt" type="text" placeholder="请输入" maxlength="80" />
            </li>
            <li class="item itemSelect">
                <label class="lb">活动/培训形式</label>
                <span   :class="trainingWayText ? 'placeholder' : 'placeholder tipCor'" @click="openActivityType()">
                    <template v-if="trainingWayText">
                        {{trainingWayText}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openActivityType()"></i>
            </li>
            <li class="item itemSelect">
                <label class="lb">所属区域</label>
                <span   :class="trainingAreaText ? 'placeholder' : 'placeholder tipCor'" @click="openAreaList()">
                    <template v-if="trainingAreaText">
                        {{trainingAreaText}}
                    </template>
                    <template v-else>
                         请选择
                    </template>
                </span>
                <i class="mui-icon mui-icon-forward" @click="openAreaList()"></i>
            </li>
            <li class="item">
                <label class="lb">参与人数</label>
                <input v-model="formData.personNum" class="ipt" type="number" pattern="[0-9]*"  oninput='if(value.length>4)value=value.slice(0,4)' placeholder="请输入" />
            </li>
            <li class="item itemTextArea">
                <label class="lb lbLong">活动/培训内容</label>
            </li>
            <textarea v-model="formData.trainingContent" class="txtArea" type="text" placeholder="请输入..." maxlength="500" />
        </ul>
        <bottom-fixedbutton @clickbottomFixedBtn="submitForm()" :btnText="bottomFixedbuttonText" ></bottom-fixedbutton>

        <!-- 选择区域弹框开始 -->
        <search-list  ref="searchAreaList" @selectArea="selectArea" :httpUrl="areaUrl" :type="areaflag"></search-list>
        <!-- 选择区域弹框结束 -->

    </div>        
</template>

<script>
import "./addActivity.less";

import "./addActivity.js";

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import searchList from '@src/common/searchList/searchList'

import tipAction from "@common/components/otherComponents/tipAction/tipAction"

//MUI日历和下拉菜单
import '@common/less/mui/resetMuiPop.less';
import popPicker from '@src/common/mui/popPicker/popPicker.js'

export default {
    name: "addActivity",
    components:{
        bottomFixedbutton,
        searchList
    },
    data() {
        return {
            bottomFixedbuttonText:'保存',
            validFormElements:{
            "activityName":"请输入活动/培训名称",
            "holdTime":"请选择举办时间",
            "holdPlace":"请输入举办地点",
            "trainingWay":"请选择活动/培训形式",
            "trainingArea":"请选择所属区域",
            "personNum":"请输入参与人数",
            "trainingContent":"请输入活动/培训内容"
            },
            formData:{
                activityName:null,
                holdTime: null,
                holdPlace:null,
                trainingWay:null,
                trainingArea:null,
                personNum:null,
                trainingContent:null
            },
            trainingWayText: null,
            trainingAreaText: null,
            formValid:true, 
            areaUrl: apiUrl.selectAreaListByNameApi,
            areaData: [],//所属区域列表数据
            areaflag:'areaflag',
            trainingWayDict:[]//活动形式字典
        };
    },
    created: function() {  
        
        //获取字典
        var arrDic = 'trainingWay';
        this.$utils.getDicData(arrDic,res => {
             for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        this[key + "Dict"] = res[key] || [];
                    }
                }
        });

    },
    methods: {

        //打开所属区域弹窗
        openAreaList(){

             this.$refs.searchAreaList.open();

        },
      
        //选择所属区域
        selectArea(item){

           this.trainingAreaText = item.name; //所属区域
           this.formData.trainingArea = item.code; //所属区域Code

        },
         
        //举办时间MUI
        openDtPicker(){
            popPicker.pickerDate({type:'datetime'},res=>{
                this.formData.holdTime=this.$utils.momentFmtYmdhs(res.text);
            });
        },

        //活动形式
        openActivityType() {
            popPicker.pickerSelect(this.$utils.parseDicArr(this.trainingWayDict),res=>{

                this.trainingWayText = res[0].text; //活动/培训形式
                this.formData.trainingWay = res[0].value; //活动/培训形式Code

            });
        },

        //提交表单
        submitForm(){
            
            let formCusValid = this.$utils.formElValid(this.formData,this.validFormElements);

            if(!formCusValid){

                this.formValid = false;
                return;

            }

            this.$axiosHttp.http({
                    name:'提交新建活动/培训',
                    url: apiUrl.addTrainingApi,
                    params: this.formData,
                    needFailCallback:false
            }, (res) => {
            
                tipAction(res.data.message,()=>{

                    window.location.href = goUrl.activityListUrl;

                });

            }, res => {
                
            })
            
        }
        
    }
};
</script>