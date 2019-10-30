/*

  项目详情-获取详情数据

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "status": "0000",
    "message": "接口请求成功",
    "invokeId": null,
    "resultCode": 200,
    "resultMessage": "操作成功！",
    "exception": null,
    "data": {
        "id": "13151",
        "productId": "11751",
        "productName": "恒天吉运收益基金",
        "projectCode": "MP1526266814433219",
        "projectName": "恒天吉运收益基金",
        "projectShortname": "吉运基金",
        "issuanceLevel": 100000000,
        "investTerm": 24,
        "investTermUnit": "1",
        "investTermUnitName": "月",
        "buyType": "",
        "buyTypeName": null,
        "controlModel": "0",
        "controlModelName": "发行规模",
        "suggestScore": 5,
        "commissionWay": null,
        "commissionRemark": "跨期累积计算提成",
        "status": "2",
        "statusName": "发行中",
        "customerTotal": null,
        "oderWay": "0",
        "oderWayName": "自动",
        "closeout": "0",
        "upDates": 1526266910000,
        "downDate": 1536894114000,
        "perInvestStart": 100000,
        "orgInvestStart": 200000,
        "perAdditionStart": null,
        "orgAdditionStart": null,
        "achieveConverRate": 2,
        "subsidyCoefficient": 1,
        "subscribe": null,
        "amountMultiplier": 1000,
        "remark": "",
        "files": [],
        "percentages": [{
                "id": "14551",
                "amountLower": 200,
                "amountUpper": 500,
                "points": 120,
                "percentageName": "提成1"
            },
            {
                "id": "14552",
                "amountLower": 500,
                "amountUpper": 800,
                "points": 150,
                "percentageName": "提成2"
            },
            {
                "id": "14553",
                "amountLower": 800,
                "amountUpper": 1000,
                "points": 180,
                "percentageName": "提成3"
            },
            {
                "id": "14554",
                "amountLower": 1000,
                "amountUpper": null,
                "points": 200,
                "percentageName": "提成4"
            }
        ],
        "callPayment": "1",
        "callProportion": "",
        "callTime": "",
        "callPaymentName": "一次性缴清",
        "callPaymentRemark": "恒天吉运提成修改（2017.04.17）\r\n1.提高提成比例，且允许多次成交后的跨期累计(追溯一期)。\r\n调整后员工点位：30万-50万美元，1.2%；50万（含）-200万美元，1.5%；200万（含）-500万美元，1.8%；500万（含）以上，2%。\r\n2.当月成交按照最低档位（1.2%）进行发放，项目募集结束后（1亿美金），按照累积后总提成与已发放提成的差额进行一次性补发。",
        "currencyType": "0",
        "currencyTypeName": "美元",
        "riskProve": "1",
        "riskProveName": "是",
        "riskRating": "5",
        "riskRatingName": "保守级",
        "adminiManager": "国际资本",
        "adminiManagerCode": null,
        "productHoster": "香港国际资本",
        "productHosterCode": null,
        "inverstDirect": "7",
        "inverstDirectName": "债券投资",
        "incomeDistributWay": "0",
        "incomeDistributWayName": "固定收益",
        "nomineeAmount": "1",
        "benchmarkUp": 7,
        "benchmarkLow": 5
    }
});
module.exports = mymessage;
/*
    fc活动量-新建客户陪访
*/

/*// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({
    "status": "0000",
    "message": "接口请求成功"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
module.exports = pOver;
*/