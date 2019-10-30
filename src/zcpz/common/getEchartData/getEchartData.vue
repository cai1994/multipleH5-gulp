<!-- 
    获取饼图折线图数据的公用方法 

    @author yangjinlai 2019-05-16
-->
<template>
    <div class="echartWrap">
        <!-- 遮罩  盖住底下的图 -->
        <div class="echartMask"></div>
        <div id="xzPie" class="myChart"></div>
        <div id="tjPie" class="myChart"></div>
        <div id="bar" class="myChart"></div>
        <!-- <scriptLink></scriptLink> -->
    </div>
</template>
<script>
import tipAction from '@common/components/otherComponents/tipAction/tipAction'

import echarts from 'echarts';
// echarts = echarts;

import "./getEchartData.less";

export default {
    name: "echartWrap",
    props: {

        //资产配置id
        id: {
            type: String,
            default: '' //默认为空，不选中
        },

        descArr: {}, //字典值集合
    },
    // components: {
    //  'scriptLink': {
    //        render(createElement) {
    //          return createElement(
    //            'script',
    //            {
    //              attrs: {
    //                type: 'text/javascript',
    //                src: '/commonResources/common/vendor/dll/echarts.js',
    //              },
    //            },
    //          )
    //        }
    //      }

    // },
    data() {
        return {

            //$echarts : echarts,

            //推荐饼图的title
            title: '',

            //接口需要的customerName，和title一样，在上一个页面设置
            customerName: '',

            //画图默认配置
            defaultData: {
                assetNowObj: {
                    el: "xzPie",
                    titleText: "客户资产配置现状",
                    color: ["#968c8a", "#94b6d1", "#dd8045", "#a4ab82", "#d7b15c", "#7ca59d"],
                    legendData: [],
                    seriesData: []

                },

                //推荐饼状图配置
                assetRecommendObj: {
                    el: "tjPie",
                    //titleText: this.title,
                    color: ["#3992e3", "#235dc4", "#fc6600", "#c2c2c2", "#ffc000", "#77d537"],
                    legendData: [],
                    seriesData: []
                },

                //柱状图配置
                barObj: {
                    el: "bar",
                    titleText: "",
                    color: ['#0c7cd5', '#ff6300'],
                    xAxisData: [],
                    data1: [],
                    data2: []
                }
            },

            //存放画好的图（传给后台接口的入参）
            imgObj: {
                assetNowPieChart: '', //现状饼状图
                assetRecommendPieChart: '', //推荐饼状图
                assetRecommendLineChart: '', //柱状图
                assetConfigId: this.id, //接口需要的资产配置id
            },

            //控制按钮多次点击  
            isClick: false
        }
    },

    created: function() {

        //请求字典
        //this.getDic();
    },

    methods: {

        //请求画图数据
        getDrawData(type, callback) {

            if (this.isClick) {
                return false;
            }

            //为true时不可点击
            this.isClick = true;

            this.$axiosHttp.http({
                name: '请求画图数据',
                url: apiUrl.getCustomerAssetChartsApi,
                params: {
                    id: this.id, //资产配置id 
                }
            }, (res) => {

                var data = res.data.data;

                //先把这些数据清空
                this.defaultData.assetRecommendObj.legendData = [];
                this.defaultData.assetRecommendObj.seriesData = [];
                this.defaultData.assetNowObj.legendData = [];
                this.defaultData.assetNowObj.seriesData = [];
                this.defaultData.barObj.xAxisData = [];
                this.defaultData.barObj.data1 = [];
                this.defaultData.barObj.data2 = [];

                //清空画图数据
                this.imgObj.assetNowPieChart = '';
                this.imgObj.assetRecommendPieChart = '';
                this.imgObj.assetRecommendLineChart = '';

                data.forEach((course, index, arr) => {
                    //这里的数据都是字典值，需要添加对应的文案

                    //资产分类
                    this.descArr.assetClassifyDic.forEach((list, i, listArr) => {
                        if (list.keyNo == course.assetClassify) {
                            course.assetClassifyText = list.keyValue;
                        }
                    })

                    //资产类别
                    this.descArr.assetTypeDic.forEach((list, i, listArr) => {
                        if (list.keyNo == course.assetType) {
                            course.assetTypeText = list.keyValue;
                        }
                    })

                    //画推荐饼图时，有金额推荐比例，拼画图需要的legend和series数据
                    if (course.assetRecommendRatio != 0 && course.assetRecommendRatio != null) {

                        //饼图的数据
                        this.defaultData.assetRecommendObj.legendData.push(course.assetTypeText);
                        this.defaultData.assetRecommendObj.seriesData.push({
                            "value": course.assetRecommendRatio,
                            "name": course.assetTypeText
                        });

                        //柱状图的数据
                        //var ar = this.$utils.toThousand(course.assetRecommend) + '';
                        // if( ar.indexOf('.') != -1){
                        //        ar = ar.substring( 0, ar.indexOf('.'));
                        //       }
                        //ar = Math.round(ar);

                    }

                    //画现状饼图时，有金额现状比例，拼画图需要的legend和series数据
                    if (course.assetNowRatio != 0 && course.assetNowRatio != null) {

                        this.defaultData.assetNowObj.legendData.push(course.assetTypeText);

                        this.defaultData.assetNowObj.seriesData.push({
                            "value": course.assetNowRatio,
                            "name": course.assetTypeText
                        });
                    }

                    //柱状图数据
                    this.defaultData.barObj.xAxisData.push(course.assetTypeText);

                    //判断有没有现状数据
                    if (course.assetNow != 0 && course.assetNow != null) {
                        var an = this.$utils.toThousand(course.assetNow) + '';
                        //判断有没有小数点
                        // if( an.indexOf('.') != -1){
                        //  an = an.substring( 0, an.indexOf('.'));
                        // }
                        an = Math.round(an);
                        this.defaultData.barObj.data1.push(Number(an));
                    } else {
                        this.defaultData.barObj.data1.push(0);
                    }

                    //判断有没有推荐数据
                    if (course.assetRecommend != 0 && course.assetRecommend != null) {
                        var ar = this.$utils.toThousand(course.assetRecommend) + '';
                        //判断有没有小数点
                        // if( ar.indexOf('.') != -1){
                        //  ar = ar.substring( 0, ar.indexOf('.'));
                        // }
                        ar = Math.round(ar);
                        this.defaultData.barObj.data2.push(Number(ar));
                    } else {
                        this.defaultData.barObj.data2.push(0);
                    }


                })

                //画推荐饼图
                if (this.defaultData.assetRecommendObj.seriesData.length != 0) {
                    //这时设置title
                    this.defaultData.assetRecommendObj.title = this.title;
                    this.imgObj.assetRecommendPieChart = this.drawPie(this.defaultData.assetRecommendObj);
                }

                //画现状饼图                 
                if (this.defaultData.assetNowObj.seriesData.length != 0) {
                    this.imgObj.assetNowPieChart = this.drawPie(this.defaultData.assetNowObj);

                }

                //画柱状图，先判断是否有数据，根据产品说法，只判断现状
                // var barRecommend = false;
                // this.defaultData.barObj.data2.forEach( (x,y,z) => {
                //  if( x !== null ){
                //      barRecommend = true;
                //  }
                // })
                var barNow = false;
                this.defaultData.barObj.data1.forEach((m, n, p) => {
                    //0和null都不展示
                    if (m != null && m != 0) {
                        barNow = true;
                    }
                })
                //现状有数据的时候，才画图
                if (barNow) {
                    this.imgObj.assetRecommendLineChart = this.drawBar(this.defaultData.barObj);
                    //添加之前清除data1 data2的数组数据
                    //this.defaultData.barObj.data1=[]
                    //this.defaultData.barObj.data2=[]
                }

                //将三张图片提交给接口
                this.$axiosHttp.http({
                    method: 'post',
                    name: '保存资产配置报告的三张图片',
                    url: apiUrl.savePdfReportChartImageApi,
                    needFailCallback: true,
                    data: this.imgObj
                }, (res) => {
                    //改为false;
                    this.isClick = false;

                    if (type == 'noOpenPdf') {
                        //不打开pdf，走callback
                        callback();
                    } else {
                        //接口成功，打开pdf
                        window.location.href = apiUrl.downloadPdfReportApi + '?assetConfigId=' + this.id + '&customerName=' + encodeURI(this.customerName);
                    }
                }, (res) => {
                    //接口失败,改为false;
                    tipAction(res.data.message);
                    this.isClick = false;
                })

            })
        },


        //画饼图
        drawPie(obj) {

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById(obj.el));
            let normal = {
                borderColor: "#FFF",
                borderWidth: 1,
            }

            // 绘制图表
            if (obj.seriesData.length == 1) {
                normal = {
                    borderColor: "",
                    borderWidth: 0,
                }
            }

            myChart.setOption({
                color: obj.color,
                backgroundColor: '#fff',
                title: {
                    text: obj.titleText ? obj.titleText : this.title, //配置了就用配置的，否则用外部设置的title
                    x: 'center',
                    textStyle: {
                        fontSize: 22,
                        color: '#e5e5e5',
                        fontWeight: 'lighter',
                    }
                },

                legend: {
                    selectedMode: false,
                    orient: 'horizontal',
                    bottom: '30',
                    data: obj.legendData,
                    padding: [5, 50],
                    itemWidth: 10,
                    itemHeight: 10
                },

                series: [{
                    type: 'pie',
                    legendHoverLink: false,
                    hoverAnimation: false,
                    animation: false,
                    radius: '55%',
                    center: ['50%', '40%'],
                    label: {
                        normal: {
                            position: "outside",
                            formatter: '{d}%',
                            fontSize: 6,
                            color: '#999',
                        },
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: obj.seriesData,
                    itemStyle: {
                        normal: normal
                    },
                }]
            });
            return myChart.getDataURL();
        },

        //绘制柱状图
        drawBar(obj) {
            let myChart = echarts.init(document.getElementById(obj.el));
            myChart.setOption({
                backgroundColor: '',
                color: obj.color,
                title: {
                    text: obj.titleText,
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['资产配置现状', '建议资产配置'],
                    bottom: 'bottom',
                    itemWidth: 10,
                    itemHeight: 10
                },
                calculable: true,
                grid: {
                    left: '10%',
                    bottom: '35%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: obj.xAxisData,
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        align: 'right',
                        margin: 10,
                        fontSize: 8,
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '(万元)',
                }],
                series: [{
                        name: '资产配置现状',
                        type: 'bar',
                        data: obj.data1,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999'
                                },

                            }
                        }
                    },
                    {
                        name: '建议资产配置',
                        type: 'bar',
                        data: obj.data2,
                        label: {
                            //offset: [20,50],
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        }
                    }
                ]
            });
            return myChart.getDataURL();
        },

    }
}

</script>
