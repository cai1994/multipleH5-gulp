
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":[
		{
			"assetConfigId":1,
			"assetClassify":"1",
			"assetType":"1",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		},
		{
			"assetConfigId":2,
			"assetClassify":"2",
			"assetType":"2",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		},
		{
			"assetConfigId":3,
			"assetClassify":"3",
			"assetType":"3",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		},
		{
			"assetConfigId":4,
			"assetClassify":"1",
			"assetType":"1",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		},
		{
			"assetConfigId":5,
			"assetClassify":"2",
			"assetType":"2",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		},
		{
			"assetConfigId":6,
			"assetClassify":"3",
			"assetType":"3",
			"assetRecommendRatio":10,
			"assetRecommend":10000

		}
	]
	
});

//把生成的假数据当做模块输出
module.exports = data;