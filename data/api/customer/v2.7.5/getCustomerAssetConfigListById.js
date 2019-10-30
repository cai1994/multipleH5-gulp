
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":{
        "list": [{
            "assetType":104,//类型 
            "amountNow":"100"//  现状金额
        },{
            "assetType":106,//类型 
            "amountNow":"100"//  现状金额
        },{
            "assetType":107,//类型 
            "amountNow":"100"//  现状金额
        },{
            "assetType":108,//类型 
            "amountNow":"100"//  现状金额
        },{
            "assetType":109,//类型 
            "amountNow":"100"//  现状金额
        },{
            "assetType":110,//类型 
            "amountNow":"100"//  现状金额
        }]
	}
});

//把生成的假数据当做模块输出
module.exports = data;