
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data|20": [{
		"id": 1,
		"customerNo":11,
		"customerName": "11娄淑娄淑华娄淑华娄淑华娄淑华华",
		"customerSource": null,
		"canConfigAssets": "500",
		"lifeTerm": "2",
		"riskType": "1",
		"createTime": "2019-04-10",
		"isReportable|1": [1, 0] 
	}]
});

//把生成的假数据当做模块输出
module.exports = data;