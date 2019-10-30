/**
 * 获取资产配置现状表单
 */


// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":  [
		{
		"key": "200",
		"name": "保险产品总保费"
		},
		{
		"key": "201",
		"memo": "(移民、置业)",
		"name": "海外产品金额"
		},
		{
		"key": "202",
		"name": "家族信托金额"
		},
		{
		"key": "203",
		"name": "货币类基金金额"
		},
		{
		"key": "204",
		"name": "固收投资产品金额"
		},
		{
		"key": "205",
		"name": "浮收投资产品金额"
		}
	]
});

//把生成的假数据当做模块输出
module.exports = data;