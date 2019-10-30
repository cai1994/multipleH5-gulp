/**
 * 保存资产配置的三张图片
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":[]
});

//把生成的假数据当做模块输出
module.exports = data;