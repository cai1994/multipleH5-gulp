
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data|2": [{
			"id": 11,
			"assetClassify":"2",
			"assetType": "2",
			"productType":"2",
			"subdivisionStrategy": "2",
			"products": [{
				"projectName": "推荐产品名称",
				"projectAbbreviation": "产品简",
				"id":1,
			},{
				"projectName": "推荐产品名称",
				"projectAbbreviation": "产品简",
				"id":2,
			},{
				"projectName": "推荐产品名称",
				"projectAbbreviation": "产品简",
				"id":3,
			}]
		}]
});

//把生成的假数据当做模块输出
module.exports = data;