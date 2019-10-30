/*
	fc活动量-活动培训查询
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"status": "1000", 
	"message": "接口请求成功", 
	"total":10,
	"data|10":[
			{
				"id":1,
				"activityName":"汇添富收益快线货币A发的实得分实得分阿萨德飞 ",//活动名称
				"trainingAreaName":"西北财富管理事业部",//区域名称
				"holdTime":"2016-11-04",//举办时间
				"holdPlace":"北京朝阳",//	举办地址
				// "submitTime":"2016-11-04 12:30",//提交时间
				// "updateTime":"2016-11-04 12:30",//确认时间
			},
			{
				"id":1,
				"activityName":"汇添富收益快线货币A发的实得分实得分阿萨德飞 ",//活动名称
				"trainingAreaName":"北京大区",//区域名称
				"holdTime":"2016-11-04",//举办时间
				"holdPlace":"北京朝阳",//	举办地址
				// "submitTime":"2016-11-04 12:30",//提交时间
				// "updateTime":"2016-11-04 12:30",//确认时间
			}]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
module.exports = pOver;