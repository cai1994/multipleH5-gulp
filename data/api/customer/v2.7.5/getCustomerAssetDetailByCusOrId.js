
// 第一步回显接口
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "1000", 
	"message": "接口请求成功",
	"data": {
		//"id": 1,
		//"customerNo":11,
		// "customerName": "",
		// "customerSource": "",
		"canConfigAssets":2000,
		"lifeTerm": null,
		"riskType": '1',
		"createTime": null,
		"fixedCost" : null,
		"cashStable": null,
		"isJustNeed": null,
		"overseasAmount": null,
		"isInvestNeed": null,
		"oldAssetConfigId": "old111",
	}
});

//把生成的假数据当做模块输出
module.exports = data;