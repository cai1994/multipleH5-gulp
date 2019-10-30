/*
 * @page: 不同列表列表共同操作
 * @Author: songxiaoyu
 * @Date:   2019-05-21 
 * @Last Modified by:   songxiaoyu
 * @description:
 *     使用页面--我的任务列表页面，我的下属任务列表页面
 */

const listOperate = {
    data() {
        return {}
    },
    created() {
        // 查看任务详情
        $('body').on('tap', '.dataList', (e) => {
            let taskId = $(e.currentTarget).attr('taskId');
            window.location.href = goUrl.taskDetail + '?taskId=' + taskId;
        })
    },
    filters: {
        /**
         * [dealFiveData 不同目标展示项设置---使用页面：任务详情页，我的任务列表页，我的下属任务列表页,有的页面有：，有的没有，所以得写2套]
         * @author songxiaoyu 2019-06-03
         * @param  {[type]} d      [传入数据]
         * @param  {[type]} detail [来源是详情页]
         * @return {[type]}        [处理完数据]
         */
        dealFiveData: function(d, detail) {
            let data = {};

            if (detail) { // 任务详情页展示,与完成状态相比，没有冒号
                switch (d.target) {
                    case '1':
                        data = {
                            "完成笔数": d.realDeal,
                            "完成金额": d.realAmtStr,
                            "完成进度": d.completed,
                        };
                        break;
                    case '2':
                        data = {
                            "完成笔数": d.realDeal,
                            "完成金额": d.realAmtStr,
                            "标准业绩": d.performDimension,
                            "完成进度": d.completed,
                        };
                        break;
                    case '3':
                        data = {
                            "当月出单人数": d.monthRealDeal,
                            "当月考核人数": d.monthTargetDeal,
                            "当月出单率": d.currentDealRatio,
                            "出单率": d.dealRatioStr,
                            "完成进度": d.completed,
                        };
                        break;
                }
            } else if (d.type == '3') { // 已完成状态，
                switch (d.target) {
                    case '1':
                        data = {
                            "完成笔数：": d.realDeal,
                            "完成金额：": d.realAmtStr,
                            "完成进度：": d.completed,
                        };
                        break;
                    case '2':
                        data = {
                            "完成笔数：": d.realDeal,
                            "完成金额：": d.realAmtStr,
                            "标准业绩：": d.performDimension,
                            "完成进度：": d.completed,
                        };
                        break;
                    case '3':
                        data = {
                            "当月出单人数：": d.monthRealDeal,
                            "当月考核人数：": d.monthTargetDeal,
                            "当月出单率：": d.currentDealRatio,
                            "出单率：": d.dealRatioStr,
                            "完成进度：": d.completed,
                        };
                        break;
                }
            } else if (d.type == '2') { // 进行中状态，显示字段
                switch (d.target) {
                    case '1':
                        data = {
                            "完成笔数：": d.realDeal,
                        };
                        break;
                    case '2':
                        data = {
                            "完成笔数：": d.realDeal,
                            "完成金额：": d.realAmtStr,
                        };
                        break;
                    case '3':
                        data = {
                            "当月出单人数：": d.monthRealDeal,
                            "当月考核人数：": d.monthTargetDeal,
                            "当月出单率：": d.currentDealRatio,
                        };
                        break;
                }
            }

            return data;
        },
        pcData: function(d) { // 进度条数据
            var data = {
                left: '任务进度：',
            };

            // 去掉完成进度百分比
            var p = (d.completed && Number(d.completed.split('%')[0])) || 0;
            data.percent = p;

            switch (d.target) {
                case '1':
                    data.right = '已完成金额' + d.realAmtStr;
                    break;
                case '2':
                    data.right = '标准业绩' + d.performDimension;
                    break;
                case '3':
                    data.right = '出单率' + d.dealRatioStr;
                    break;
            }
            return data;
        }
    },
    methods: {


    },
}
export default listOperate
