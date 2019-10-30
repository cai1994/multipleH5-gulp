/*
 * @page: 我的下属任务列表
 * @Author: songxiaoyu
 * @Date:   2019-05-22 15:46:42
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "message": "查询成功",
    "status": "0000",
    "total": 1,
    "pageNum":2,
    "data|4": [{
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "1",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": 1,
        "type": "1",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "121312"
    }, {
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "2",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": 2,
        "type": "2",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "121322"
    }, {
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "3",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": 4,
        "type": "3",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "123123123"
    }, {
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "1",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": 3,
        "type": "1",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "23123"
    }, {
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "2",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": 123,
        "type": "2",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "12113"
    }, {
        "amtRatio": 83333.3333,
        "completed": "80%",
        "endTime": "2018-08-28 18:00:00",
        "isIssue": "0",
        "ownDept": "中南管理中心品牌市场部",
        "startTime": "2018-07-20 09:00:00",
        "status": "6",
        "target": "1",
        "targetCondition": "1",
        "targetValue": 20000.00,
        "taskId": 12910,
        "taskName": "730-测试-部门中南管理中心品牌市场部中南管理中心品牌市场部",
        "taskType": "1",
        "realDeal": "50",
        "issue": "1",
        "day": "10",
        "monthRealDeal": "23",
        "monthTargetDeal": "100",
        "currentDealRatio": 33.21,
        "dealRatioStr": 33.21,
        "rankNum": '',
        "type": "3",
        "residueTimeStr": "5天24小时4分",
        "residueTime": "1231231"
    }],
    

});

module.exports = data;
