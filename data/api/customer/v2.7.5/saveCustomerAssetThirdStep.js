/**
 * 资产配置现状表单提交
 */


// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":  {

		"id": 2324234
	}
});

//把生成的假数据当做模块输出
module.exports = data;