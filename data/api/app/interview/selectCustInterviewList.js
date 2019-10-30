/*
	fc活动量-客户陪访查询
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"status": "4007", 
	"message": "接口请求成功", 
	"total":10,
	"data|10": [
		{
			"id":1,
			"empName":"理顾名称 ",//理顾名称
			"empCode":"H018970",//理顾工号
			"viewObject":"拜访对象",//拜访对象
			"viewDate":"2016-11-04",//拜访时间
            "custName":"客户名称",//客户名称
            // "submitTime":"2016-11-04 12:30",//提交时间
			// "updateTime":"2016-11-04 12:30",//确认时间
		},
		{
			"id":1,
			"empName":"理顾名称 ",//理顾名称
			"empCode":"H018970",//理顾工号
			"viewObject":"拜访对象",//拜访对象
			"viewDate":"2016-11-04",//拜访时间
            "custName":"客户名称",//客户名称
            // "submitTime":"2016-11-04 12:30",//提交时间
			// "updateTime":"2016-11-04 12:30",//确认时间
		}]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
module.exports = pOver;