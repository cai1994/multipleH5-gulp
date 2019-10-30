/**
 * 查询客户信息
 */



// 第一步回显接口
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data": {
		"id": 1,
		"customerNo":11,
		"customerName": "客户客户客户",
		"customerSource": "1",
		"riskType" : 1,
		"age": 18

	}
});

//把生成的假数据当做模块输出
module.exports = data;