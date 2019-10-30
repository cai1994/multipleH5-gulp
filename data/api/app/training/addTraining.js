/*
	fc活动量-新建活动培训
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
module.exports = pOver;