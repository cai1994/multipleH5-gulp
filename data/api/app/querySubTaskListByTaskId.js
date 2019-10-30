/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-05-13 13:47:26
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "message": "获取成功",
    "status": "0000",
    "data": [{
        "objectType": "2",
        "parentId": 10501,
        "target": "1",
        "targetCondition": "1",
        "targetValue": 500000.00,
        "taskId": 10552,
        "taskName": "测试创建任务2018-06-14 子任务",
        "taskObject": "035056"
    },{
        "objectType": "2",
        "parentId": 10502,
        "target": "1",
        "targetCondition": "1",
        "targetValue": 500000.00,
        "taskId": 10551,
        "taskName": "测试创建任务2018-06-14 子任务",
        "taskObject": "035056"
    },{
        "objectType": "2",
        "parentId": 10503,
        "target": "1",
        "targetCondition": "1",
        "targetValue": 500000.00,
        "taskId": 10553,
        "taskName": "测试创建任务2018-06-14 子任务",
        "taskObject": "035056"
    }]
});

module.exports = data;
