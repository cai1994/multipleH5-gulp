
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "3333", 
	"message": "接口请求成功",
	"data":{
		"assetConfigId":"ConfigId111",
		"oldAssetConfigId":"old222"
	}
});

//把生成的假数据当做模块输出
module.exports = data;