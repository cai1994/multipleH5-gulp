/*
 * @page: 任务排名列表
 * @Author: songxiaoyu
 * @Date:   2019-05-13 13:54:55
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({

    "message": "查询成功",
    "status": "0000",
    "total": 38,
    "data": {
        "rowNum": 3,
        "name": "北京第一营业部",
        "realAmt": "100.25",
        "realDealRatio": "10.25%",
        "lastDifference": "12.5443万",
        "residueTime":9540050000,
        "currentCompleted": "9981233.2654万",
        // "residueTime":8645000,
        "taskRankAppVOList|2": [{
                "rowNum": "1",
                "name": "北京第一营业部1",
                "realAmt": "100.25",
                "realDealRatio": "10.25%",
                "lastDifference": "0.1233万",
                "currentCompleted": "9981233.2654万",
            },
            {
                "rowNum": "2",
                "name": "北京第一营业部2",
                "realAmt": "100.25",
                "realDealRatio": "10.25%",
                "lastDifference": "12.3300万",
                "currentCompleted": "9981233.2654万",
            }, {
                "rowNum": "3",
                "name": "北京第一营业部3",
                "realAmt": "100.25",
                "realDealRatio": "10.25%",
                "lastDifference": "1233万",
                "currentCompleted": "1233万",
            }, {
                "rowNum": "4",
                "name": "北京第一营业部3",
                "realAmt": "100.25",
                "realDealRatio": "10.25%",
                "lastDifference": "1233万",
                "currentCompleted": "1233万",
            }, {
                "rowNum": "5",
                "name": "北京第一营业部3",
                "realAmt": "100.25",
                "realDealRatio": "10.25%",
                "currentCompleted": "1233万",
                "lastDifference": "1233万",
            }
        ]
    },
});

module.exports = data;
