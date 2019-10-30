
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
	"data|10": [{
		"customerName": "娄淑华",
		"sex": null,
		"riskGrade": null,
		"lastContactTime": null,
		"empNo": "00000",
		"customerId": "310253",
		"custNo": "",
		"customerType": "1",
		"custstatus": "0",
		"cardType": "4",
		"cardNumber": null,
		"phone": null,
		"mobileInternet": null,
		"idnocheckflag": null,
		"bankPhones": null,
		"address": null,
		"viplevel": null,
		"birthday": null,
		"exclusiveCustomer": null,
		"relationType": null,
		"investorType": "0",
		"isQualifyInvestor": null,
		"assetsSum": null,
		"outdateFreezeStatus": null,
		"lawFreezeStatus": null,
		"buyFreeze": null,
		"customerSource":"1"
	},{
		"customerName": "名字",
		"sex": null,
		"riskGrade": null,
		"lastContactTime": null,
		"empNo": "00000",
		"customerId": "310253",
		"custNo": "111",
		"customerType": "1",
		"custstatus": "0",
		"cardType": "4",
		"cardNumber": null,
		"phone": null,
		"mobileInternet": null,
		"idnocheckflag": null,
		"bankPhones": null,
		"address": null,
		"viplevel": null,
		"birthday": null,
		"exclusiveCustomer": null,
		"relationType": null,
		"investorType": "0",
		"isQualifyInvestor": null,
		"assetsSum": null,
		"outdateFreezeStatus": null,
		"lawFreezeStatus": null,
		"buyFreeze": null,
		"customerSource":"1"
	}],
	"searchCount": 1,
	"status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;