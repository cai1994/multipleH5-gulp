<!-- 问卷 -->
<template>
    <div class="questionWrap">

        <div class="listSection">
            <!-- 选择题时 -->
        	<div class="question" :num="questionNow.questionNo" v-if="questionNow.list.length">
        		<p class="topic">({{questionNow.questionNo}}/{{questionNum}})&nbsp;&nbsp;{{questionNow.questionContent}}</p>
        		<ul class="list">
                    <!-- 循环答案 -->
        			<li v-for="(l , index) in questionNow.list" @click="radioAction(index)">
                        <!-- <span class="txt">{{$utils.getWord()[Number(index)]}}、{{l.answerContent}}</span> -->
                        <span class="txt">{{l.answerContent}}</span>
                        <radio :radioName="questionNow.radioName" :ref="getRadioRef(index)"></radio>
                    </li>
        		</ul>
        	</div>

            <!-- 填空题时 -->
            <div class="question tkQuestion" :num="questionNow.questionNo" v-else >

                <ul class="quesUl">
                    <li class='quesLi'>
                        <p class="topic">({{questionNow.questionNo}}/{{questionNum}})&nbsp;&nbsp;{{splitQuestion(questionNow.questionContent)[0]}}</p>
                        <div class="formSection">
                            <ul class="list">
                                <li class="item hasUnit">
                                    <div class="unit">万元</div>
                                    <input class="ipt" type="tel" placeholder="请输入" v-model="tkAnswer_1" oninput="value=value.replace(/[^0-9]/g,'');" maxlength="10">
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul class="quesUl">
                    <li class='quesLi'>
                        <p class="topic">{{splitQuestion(questionNow.questionContent)[1]}}</p>
                        <div class="formSection">
                            <ul class="list">
                                <li class="item hasUnit">
                                    <div class="unit">万美元</div>
                                    <input class="ipt" type="tel" placeholder="请输入" v-model="tkAnswer_2" oninput="value=value.replace(/[^0-9]/g,'');" maxlength="10">
                                </li>
                            </ul>
                            
                        </div>
                    </li>
                </ul>
            </div>

        	<!-- 当前题目解释 -->
        	<discription v-if="questionNow.questionNo == 3" discriptionTxt="稳定收入的含义为月收入是家庭总月度开销的2倍"></discription>

        	<!-- 底部按钮 一个按钮时 -->
        	<bottom-fixedbutton  @clickbottomFixedBtn="changeQuestion('next')" btnText="下一题" v-if="questionNow.questionNo == 1" ></bottom-fixedbutton>
            
            <!-- 底部按钮 多个按钮时 -->
            <bottom-fixedbutton  v-else :twoButtonList="twoButtonList" twoButton="true"></bottom-fixedbutton>
        </div>

        <echart-data ref="echartWrap" :id="echartId"  :descArr="descArr"></echart-data>

    </div>
</template>

<script>

import "./questionnaire.less";
//import "./questionnaire.js";
 
 
//import searchList from '@src/common/searchList/searchList'

import bottomFixedbutton from '@src/common/bottomFixedbutton/bottomFixedbutton'

import radio from '@src/common/radio/radio'

import discription from '@src/common/discription/discription'

import tipAction from '@common/components/otherComponents/tipAction/tipAction'

//请求画图数据
import echartData from '@src/zcpz/common/getEchartData/getEchartData'

//MUI日历和下拉菜单
// import popPicker from '@src/common/mui/popPicker/popPicker.js' 
// import '@common/less/mui/resetMuiPop.less';


//url上参数
var arg = splitUrl(),
    argType = arg['type'],
    argId = arg['id']; //上一步带过来的资产配置id

export default {
    name: "questionnaire",
    components:{
        radio,
        bottomFixedbutton,
        discription,
        echartData,
    },
    data() {
        var that = this;
        return {

            echartId: argId,

        	//设置按钮的默认文案
        	// buttonTxt: {
        	// 	left: '上一题',
        	// 	right: '下一题',
        	// 	submit: '提交'
        	// },
            
            //两个按钮时的配置
            twoButtonList: {
                left: {
                    txt: '上一题',
                    clickFunc: function(){
                        that.changeQuestion()
                    },
                    type: 'type_1'
                },
                right: { 
                    txt: '下一题',
                    clickFunc: function(){
                        that.changeQuestion('next')
                    },
                    type: 'type_2'
                }
            },


            //存放接口拿到的所有题目
            questionList: null,

            //当前题目
        	questionNow: {
                list: []
            },

            //题目个数
            questionNum: 0,

            //答案数组
            answerList: [] ,

            //第4道填空题的答案
            tkAnswer_1: '',
            //选填题的答案
            tkAnswer_2: '',

            //控制按钮点击
            isClick: false,

            //接口请求回来的字典值保存
            descArr: {      
                lifeTermDic: null, //生命周期
                riskTypeDic: null, //风险偏好
                assetClassifyDic: null, //资产分类
                assetTypeDic: null, //资产类别
            },
        };
    },
    
    created: function() {

        //请求字典
        this.getDic();

        //请求题目
        this.getQuestion();
    },
    watch: {

        //监听questionNow，题目改变时改变按钮状态
        questionNow : {
            deep: true,
            handler(newName, oldName){
                //改变时调用changeButton
                this.changeButton();
            }
        }
    },
    methods: {

        getDic(){
            this.$axiosHttp.http({
                name:'获取字典',
                url: apiUrl.getCustomerAssetDictionaryApi,
                data:["1001", "1002","1003", "1004"], 
            }, (res) => {
               /* 1000是与否
                1001生命周期阶段
                1002客户风险承受能力
                1003资产分类
                1004资产类别
                1005项目类型
                1006细分策略
                1007家庭未来现金流稳定性*/

                //1001生命周期阶段
                this.descArr.lifeTermDic=res.data.data[1001];
                this.descArr.riskTypeDic = res.data.data[1002];  //风险承受能力字典值
                this.descArr.assetClassifyDic = res.data.data[1003]; //资产分类
                this.descArr.assetTypeDic = res.data.data[1004]; //资产类别
                
            })

        },

        //查看资产配置详情
        // getData(){

        //     this.$axiosHttp.http({
        //         name:'查看资产配置详情',
        //         url: apiUrl.getCustomerAssetDetailByIdApi,
        //         params: {
        //             id: argId, //资产配置id 
        //         }
        //     }, (res) => {

        //         var data = res.data.data;

        //         //资产量级
        //         var name = this.$utils.toThousand( Number( data.canConfigAssets) ) + '万元';

        //         //生命周期
        //         var lifeTerm =  this.descArr.lifeTermDic.filter(function(el){
        //             return el.keyNo == data.lifeTerm
        //         });
        //         var lifeName = lifeTerm.length ? lifeTerm[0].keyValue : '';

        //         //风险承受能力
        //         var riskType =  this.descArr.riskTypeDic.filter(function(el){
        //             return el.keyNo == data.riskType
        //         });
        //         var riskName = riskType.length ? riskType[0].keyValue : '';

        //         //设置传递给画图组件的title
        //         this.$refs.echartWrap.title = name + '+' + lifeName + '+' + riskName;

        //         //设置传给画图组件的customerName
        //         this.$refs.echartWrap.customerName = data.customerName;

        //     })
        // },


        //获取问题和答案
        getQuestion(){
            var that = this;

            this.$axiosHttp.http({
                name:'请求问卷题目答案',
                url: apiUrl.selectQuesAndAnsApi,
                params: {
                    id: ( !!argType && argType == 'edit') ? argId: '' //资产配置id ，新增时可不传，编辑时必传，用于回显
                }
            }, (res) => {

                //所有问题及答案
                this.questionList = res.data.data;

                //题目数量
                this.questionNum = this.questionList.length;

                //用户的答案数组默认生成
                var aArr = [];
                $.each( that.questionList, function(i, el){
                    if( el.questionNo == 4 ){
                        //填空题时，元转成万元，有答案
                        //
                        if( !!el.answerResult ){
                            var answer = el.answerResult.split(','),
                                newAnswer = [];
                            answer.forEach( (l, i, a) => {
                                //从元转为万元
                                newAnswer.push( that.$utils.toThousand( Number(l) ) ) ; 
                            })    
                            //newAnswer再转成字符串
                            newAnswer = newAnswer.join(',');  
                        }
                        aArr.push( {
                            questionNo: el.questionNo,
                            answerContent: el.answerResult ?  newAnswer : null //如果是编辑，可能是已经有了答案的
                        })  
                                        
                    }
                    else{
                        aArr.push( {
                            questionNo: el.questionNo,
                            answerContent: el.answerResult ?  el.answerResult : null //如果是编辑，可能是已经有了答案的
                        })
                    }
                    
                })
                this.answerList = aArr;

                //展示第一道题
                this.questionNow = this.questionList[0];
                this.questionNow.radioName = 'radio_1' ;

                //回显答案
                this.setAnswer(0);

            })
        }, 

        //拆分填空题题目
        splitQuestion( question){
            if( !!question ){
                return question.split(',');
            }
            else{
                return []
            }
        },

        //切换题目
        changeQuestion(type){

            if( type == 'next' || type == 'submit' ){
                //下一题时，先判断当前页面上题目有没有选
                var hasAnswer = false;

                //选择题时
                if( this.questionNow.list.length ){
                    if( $('.radioBox input:checked').length > 0){
                        hasAnswer = true;
                    }
                }
                else{
                    //填空题
                    ( !!this.tkAnswer_1 ) && ( hasAnswer = true);
                }
                if( hasAnswer ){

                    //如果是第四题，判断100万元
                    if( ( this.questionNow.questionNo == 4) && ( this.tkAnswer_1 < 100 ) ){
                        tipAction('可配置资产量级金额不得少于100万元');
                        //不再执行下面的逻辑
                        return false;
                    }

                    // if( ( this.questionNow.questionNo == 4) && !!this.tkAnswer_2 && ( this.tkAnswer_2 < 100 ) ){
                    //     tipAction('可配置资产量级金额不得少于100万元');
                    //     //不再执行下面的逻辑
                    //     return false;
                    // }
                }
                else{
                    //没有选，提示文案
                    if( type == 'submit' ){
                        tipAction('请回答问题再提交');
                    }
                    else{
                        tipAction('请回答问题再进入下一题');
                    }
                    
                    //不再执行下面的check属性重置逻辑
                    return false;
                }
            //}

            //if( type == 'next' || type == 'submit'){
                //当前题目的索引
                
            }

            var qIndex = Number( this.questionNow.questionNo ) - 1;

            //记录当前选中的答案
            //判断是选择题还是填空题 
            if( this.questionNow.list.length > 0 ){
                //选择
                var answer = $('.radioBox input:checked').parents('li').index() + 1;
            }
            else{
                //填空，从万元转成元
                //var answer = this.$utils.toOne ( Number(this.tkAnswer_1)) + ( !!this.tkAnswer_2  ? ',' +  this.$utils.toOne ( Number(this.tkAnswer_2)) : '');
                var answer = this.tkAnswer_1 + ( (!!this.tkAnswer_2 && (this.tkAnswer_2 != 0))  ? ',' +  this.tkAnswer_2 : '');
            }

            //保存当前选择的答案
            this.answerList[ qIndex ] = {
                questionNo: this.questionNow.questionNo,
                answerContent: answer
            }
            

            if( type == 'submit'){
                //提交问卷，在这里获取到最后一道题的答案后，再提交，不执行后面的逻辑
                this.submitQA();
                return false;
            }
            else if( type == 'next' ){
                //下一题时, 应该切换到的题目的索引index
                var index = Number( this.questionNow.questionNo );
            }
            else{
                //上一题，this.questionNow.questionNo为2时，这道题的索引是1，因此从第2题回到第1题，这里应该-2
                var index = Number( this.questionNow.questionNo ) - 2;
            }

            if( index == 2){
                //要展示的是第三题时
                //判断第一题的选择情况，对应展示第三题的数据
                if( this.answerList[0].answerContent == 1 ){
                    //第一题答案选A
                    var threeList = this.$utils.objDeepCopy(this.questionList[ index ]);
                    //删除答案后两条
                    threeList.list = threeList.list.splice(0, 3);
                }
                else{
                    //第一题答案选B
                    var threeList = this.$utils.objDeepCopy(this.questionList[ index ]);
                    //删除答案前三条
                    threeList.list = threeList.list.splice(3, 2);
                }
                this.questionNow = threeList;
            }
            else{
                this.questionNow = this.questionList[ index ];
            }


            if( type == 'next'){
                //下一题，先判断当前页面上题目有没有选
                // var hasAnswer = false;

                // //选择题时
                // if( this.questionNow.list.length ){
                //     if( $('.radioBox input:checked').length > 0){
                //         hasAnswer = true;
                //     }
                // }
                // else{
                //     //填空题
                //     ( !!this.tkAnswer_1 ) && ( hasAnswer = true);
                // }
                // if( hasAnswer ){

                    // //如果是第四题，判断100万元
                    // if( ( this.questionNow.questionNo == 4) && ( this.tkAnswer_1 < 100 ) ){
                    //     tipAction('可配置资产量级金额不得少于100万元');
                    //     //不再执行下面的逻辑
                    //     return false;
                    // }

                    // if( ( this.questionNow.questionNo == 4) && !!this.tkAnswer_2 && ( this.tkAnswer_2 < 100 ) ){
                    //     tipAction('可配置资产量级金额不得少于100万元');
                    //     //不再执行下面的逻辑
                    //     return false;
                    // }

                    // if( index == 2){
                    //     //要展示的是第三题时
                    //     //判断第一题的选择情况，对应展示第三题的数据
                    //     if( this.answerList[0].answerContent == 1 ){
                    //         //第一题答案选A
                    //         var threeList = this.$utils.objDeepCopy(this.questionList[ index ]);
                    //         //删除答案后两条
                    //         threeList.list = threeList.list.splice(0, 3);
                    //     }
                    //     else{
                    //         //第一题答案选B
                    //         var threeList = this.$utils.objDeepCopy(this.questionList[ index ]);
                    //         //删除答案前三条
                    //         threeList.list = threeList.list.splice(3, 2);
                    //     }
                    //     this.questionNow = threeList;
                    // }
                    // else{
                    //     this.questionNow = this.questionList[ index ];
                    // }

                    //修改当前单选组件的name属性
                    this.questionNow.radioName = 'radio_' + this.questionNow.questionNo ;
               // }
                // else{
                //     //没有选，提示文案
                //     tipAction('请回答问题再进入下一题');
                //     //不再执行下面的check属性重置逻辑
                //     return false;
                // }
            }
            else{
                //上一题
                //this.questionNow = this.questionList[ index ];
                this.questionNow.radioName = 'radio_' + this.questionNow.questionNo ;
            }

            this.setAnswer(index);
        },

        //回显当前题目的答案
        //index是题目索引
        setAnswer( index ){

            this.$nextTick( function(){
                //先将当前页面的check全部设为未选
                var $r = this.$refs;
                for( var i in $r){
                    if( i.indexOf('radio_') != -1){
                        //因每个题目的选项不一样多，这里要判断一下是否存在，存在的才改变isChecked，否则会报错
                        ( $r[i][0] ) && ($r[i][0].isChecked = '');
                    }
                }
                
                //再回显之前做过的答案
                var r = this.answerList[index].answerContent;
                if( !!r ){
                    //判断选择还是填空
                    if( this.questionList[index].list.length ){
                        //选择
                        this.$refs['radio_' + (Number(this.answerList[index].answerContent) -1)][0].isChecked = 'checked';
                    }
                    else{
                        //填空，拆分答案
                        var answer = r.split(',');
                            //newAnswer = [];
                        // answer.forEach( (l, i, a) => {
                        //     //从元转为万元
                        //     newAnswer.push( this.$utils.toThousand( Number(l) ) ) ; 
                        // })
                        //第4题
                        this.tkAnswer_1 = answer[0];
                        //选填题
                        ( answer[1] ) && ( this.tkAnswer_2 = answer[1]);
                    }
                    
                }
            });
        },

        //切换题目时切换两个按钮时的文案
        changeButton( ){
            var that = this;

            //最后一题时，第二个按钮的文案改成提交，同时改变调用方法
            if( this.questionNow.questionNo == this.questionNum ){
                this.twoButtonList.right.txt = '提交';
                this.twoButtonList.right.clickFunc = function(){
                    //that.submitQA();
                    that.changeQuestion('submit');
                }
            }
            else{
                this.twoButtonList.right.txt = '下一题';
                this.twoButtonList.right.clickFunc = function(){
                    that.changeQuestion('next')
                }
            }
            
        },

        //点击整行时
        radioAction( index ){
            var r = this.$refs['radio_' + index][0];
            if( !r.isChecked ){
                //如果当前没有选，给选中
                this.$refs['radio_' + index][0].isChecked ='checked' ;
            }
            
        },

        //设置这个radio的ref属性
        getRadioRef( index ){
            return 'radio_' + index;
        },

        //问卷提交
        submitQA(){

            var that = this;

            if( this.isClick ){
                return false;
            }
            this.isClick = true;

            //问卷提交时，处理了this.answerList里面的数据，第4题的答案，单位从万元变成了元
            //防止接口失败或者其他原因，提交一次后又提交第二次的话，this.answerList的数据会被多次改动
            //多次转成元（即多次加0000），这里用$answerList保存了this.answerList的数据，提交接口
            //用$answerList
            var $answerList = this.$utils.objDeepCopy(this.answerList);


            $answerList.forEach( (item, index, arr) => {

                if( index == 3){
                    //第四题时，把数据全部变成元
                    var answer = item.answerContent.split(','),
                        newAnswer = [];
                    answer.forEach( (l, i, a) => {
                        newAnswer.push( this.$utils.toOne( Number(l) ) ) ; 
                    })
                    //再转成字符串
                    item.answerContent = newAnswer.join(',');
                }

            })

            this.$axiosHttp.http({
                name:'问卷提交', 
                url: apiUrl.saveCustomerAssetSecondStepApi,
                data: {
                    id: argId, //资产配置id 
                    addOrUpdateFlag: ( !!argType && argType == 'edit') ? 2 : 1, //1-新建，2-更新
                    list: $answerList
                },
                needFailCallback:true,
            }, (res) => {
                //请求当前资产配置详情数据
                this.$axiosHttp.http({
                    name:'查看资产配置详情',
                    url: apiUrl.getCustomerAssetDetailByIdApi,
                    params: {
                        id: argId, //资产配置id 
                    }
                }, (res) => {

                    var data = res.data.data;

                    //资产量级
                    var name = this.$utils.toThousand( Number( data.canConfigAssets) ) + '万元';

                    //生命周期
                    var lifeTerm =  this.descArr.lifeTermDic.filter(function(el){
                        return el.keyNo == data.lifeTerm
                    });
                    var lifeName = lifeTerm.length ? lifeTerm[0].keyValue : '';

                    //风险承受能力
                    var riskType =  this.descArr.riskTypeDic.filter(function(el){
                        return el.keyNo == data.riskType
                    });
                    var riskName = riskType.length ? riskType[0].keyValue : '';

                    //设置传递给画图组件的title
                    this.$refs.echartWrap.title = name + '+' + lifeName + '+' + riskName;

                    //设置传给画图组件的customerName
                    this.$refs.echartWrap.customerName = data.customerName;

                })
                //跳转选择页面的url                
                var url = goUrl.resultAssetUrl + '?id=' + res.data.data.id;

                //请求画图接口
                that.$refs.echartWrap.getDrawData('noOpenPdf', function(){
                    that.isClick = false;
                    if ( !!argType && argType == 'edit'){
                        //有type参数
                        window.location.href = url + '&type=' + argType;
                    }
                    else{
                        window.location.href = url;
                    }

                });

            }, (res) => {
                //保存失败
                tipAction(res.data.message);
                that.isClick = false;
            })
        }

        //当前check选中状态变化的方法
        //checkStatusChange(){
            //判断当前题目的答案是否全都未选，改变当前按钮是否可点的状态
            
        //}


    }
};
</script>