/**
 * 获取画图数据接口
 */



// 第一步回显接口
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data": [
		{"id":10401,"assetConfigId":10051,"assetNow":104,"assetNowRatio":16.00,"assetRecommend":200,"assetRecommendRatio":10.00,"assetClassify":5,"assetType":5},
		{"id":10402,"assetConfigId":10051,"assetNow":106,"assetNowRatio":16.00,"assetRecommend":0,"assetRecommendRatio":0.00,"assetClassify":4,"assetType":4},
		{"id":10403,"assetConfigId":10051,"assetNow":110,"assetNowRatio":17.00,"assetRecommend":300,"assetRecommendRatio":15.00,"assetClassify":3,"assetType":3},
		{"id":10404,"assetConfigId":10051,"assetNow":109,"assetNowRatio":17.00,"assetRecommend":150,"assetRecommendRatio":8.00,"assetClassify":2,"assetType":3},
		{"id":10405,"assetConfigId":10051,"assetNow":107,"assetNowRatio":17.00,"assetRecommend":1026,"assetRecommendRatio":51.00,"assetClassify":1,"assetType":6},
		{"id":10406,"assetConfigId":10051,"assetNow":108,"assetNowRatio":17.00,"assetRecommend":324,"assetRecommendRatio":16.00,"assetClassify":6,"assetType":2}]
});

//把生成的假数据当做模块输出
module.exports = data;