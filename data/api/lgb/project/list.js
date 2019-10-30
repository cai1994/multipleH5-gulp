/*
	fc活动量-新建活动培训
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status":"0000", 
	"message": "接口请求成功",
	"data|20":[
		{
			'projectId':"1234",
			"projectName":"文件名国际资本",
			"investStart":"100",
			"issuanceLevel": '10000',
			"bespeakAmount|1": [0, 1000, 3000, 5000]
		}
	]
		// "fileId":"1234",
		// "filename": "文件名国际资本",
		// "fileType": "文件类型"
		
	
});




//把生成的假数据当做模块输出
//module.exports = data;

module.exports = data;