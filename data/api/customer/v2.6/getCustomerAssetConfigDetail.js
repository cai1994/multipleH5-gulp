
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":{
		"empName": "理顾姓名",
        "email": "111111111@11.com",
        "phone": "13453245678",
        "createTime": "2019/4/4",
        "customerNo": "201944",
        "customerName": "姓名",
        "customerSource": "客户来源",
        "canConfigAssets": "500",//可配置资产
        "assetMax": "500",//对应资产量级上线
        "assetMin": "100",//对应资产量级下线 
        "fixedCost": "100",//   月度固定开销  
        "lifeTerm": "1",//   生命周期阶段
        "riskType": "1",//   风险类型
        "cashStable": "1",//    家庭未来现金流的稳定性 
        "isJustNeed": "1",//    是否有海外刚需型资产配置需求（是 或 否）   
        "isInvestNeed": "1",//    是否有海外可投资型资产配置需求（是 或 否）  
        "overseasAmount": "1000000",//    海外配置金额  
        "assetConfigAmountList": [{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":null,//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":null,//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"1",//资产类别 （用于饼状图及条形图资产类别显示）
        },{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":null,//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":null,//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"2",//资产类别 （用于饼状图及条形图资产类别显示）
        },{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":null,//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":null,//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"3",//资产类别 （用于饼状图及条形图资产类别显示）
        },{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":null,//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":null,//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"4",//资产类别 （用于饼状图及条形图资产类别显示）
        },{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":null,//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":null,//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"5",//资产类别 （用于饼状图及条形图资产类别显示）
        },{
            "id":"11",//主键
            "assetConfigId":"11",//资产配置ID
            "assetNow":"1000000000",//资产配置金额现状（用于条形图--现状金额）
            "assetRecommend":"1000000000",//资产配置金额推荐（用于条形图--推荐金额）
            "assetNowRatio":"10",//资产配置金额现状比例（用于饼状图--现状比例）
            "assetRecommendRatio":"10",//资产配置金额推荐比例（用于饼状图--推荐比例）
            "assetClassify":"1",//资产分类
            "assetType":"6",//资产类别 （用于饼状图及条形图资产类别显示）
        }]
	}
});

//把生成的假数据当做模块输出
module.exports = data;