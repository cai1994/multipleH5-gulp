/*
 * @page: 获取任务详情 
 * @Author: songxiaoyu
 * @Date:   2019-05-13 
 * @Last Modified by:   songxiaoyu
 * @description:
 * 接口文档地址：http://192.168.6.105:8090/pages/viewpage.action?pageId=8688552#id-%E7%90%86%E9%A1%BE%E5%AE%9D%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-2%E3%80%81%E6%88%91%E7%9A%84%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "message": "获取成功",
    "status": "0000",
    "data": {
        "taskId": 10501,
        "parentId": null,
        "parentName": null,
        "ownDept": "0350629902",
        "ownDeptName": "中南管理中心品牌市场部",
        "taskObject": null,
        "objectType": null,
        "taskName": "测试创建任务2018-06-14",
        "targetDescription": "发行业绩>3.00万元",
        "taskType": "1",
        "taskLevel": "1",
        "type": "2", // 查看类型（1，未开始2，进行中3，已结束）
        "target": "2",
        "targetCondition": "1",
        "targetValue": 10000000.00,
        "custType": "1",
        "residueTime": 123125,
        "startTime": "2018-06-18 08:00",
        "endTime": "2018-06-15 08:00",
        "hasGroup": null,
        "memo": "测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二测试创建任务步骤二",
        "status": "6",
        "rankNum": "3",
        'monthRealDeal': '28',
        'monthTargetDeal': '200',
        'currentDealRatio': '50%',
        "realAmtStr": '20000万', // 完成金额
        "lastDifference": '0.2322万', // 距上一名差
        "performDimension": "123.39万元", // 标准业绩
        "realDeal": '2000', // 完成笔数
        "completed": '80%', // 完成进度
        "taskPunishList": [],
        "taskRewardList": [],
        "taskPunishList": [{ // 惩罚规则列表
                "id": 10901,
                "name": "活动费用取消",
                "standard": "现金管理+公募总划款责任状达成率低于50%",
                "content": "取消2018年机构尊享荟所有费用支持"
            },
            {
                "id": 10905,
                "name": "活动费用取消",
                "standard": "现金管理+公募总划款责任状达成率低于50%",
                "content": "取消2018年机构尊享荟所有费用支持"
            }
        ],
        "taskRewardList": [{ // 奖励规则列表
                "id": 10102,
                "name": "测试修改奖励1",
                "object": "测试修改经理对象1",
                "startTime": 1528214400000,
                "endTime": 1528214400000,
                "content": "测试奖励内容1",
                "rankStart": "1",
                "rankEnd": "10",
                "minimum": "10"
            },
            /*{ // 奖励规则列表
                "id": 10102,
                "name": "测试修改奖励1",
                "object": "测试修改经理对象1",
                "startTime": 1528214400000,
                "endTime": 1528214400000,
                "content": "测试奖励内容1",
                "rankStart": "1",
                "rankEnd": "10",
                "minimum": "10"
            }*/
        ],
        // "taskProjectInfoList":[],
        "taskProjectInfoList": [{
                "id": 10051,
                "code": "MP1521689238991365",
                "name": "稳金项目-注意，按照现在的类别去分类，我这里的分类只是一个样式，默认展示一个分类第三次开放"
            },
            /*{
                "id": 10151,
                "code": "MP1521708288083711",
                "name": "稳金项目-注意，按照现在的类别去分类，我这里的分类只是一个样式，默认展示一个分类第三次开放"
            }*/
        ],
        // "taskProjectConditionVOList":[],
        "taskProjectConditionVOList": [/*{
            "type": "产品类型",
            "value": "JJS、信托（多金）"
        }, {
            "type": "收益分配方式",
            "value": "固定、浮动收益"
        }*/]
    },
});

module.exports = data;
