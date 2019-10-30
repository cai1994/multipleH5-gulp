/**
 * 获取问卷问题和答案
 */


// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"status": "0000", 
	"message": "接口请求成功",
	"data":[{
			'questionNo': 1,
			'questionContent': '您的婚姻状况是?',
			'list': [{
				'answerNo': 1,
				'answerContent': '已婚'
			},{
				'answerNo':2,
				'answerContent': '单身'
			}],
			'answerResult': 2
		},{
			'questionNo': 2,
			'questionContent': '您的子女目前处于哪个阶段?',
			'list': [{
				'answerNo': 1,
				'answerContent': '无子女'
			},{
				'answerNo':2,
				'answerContent': '学龄前儿童'
			},{
				'answerNo':3,
				'answerContent': '上学期间'
			},{
				'answerNo':4,
				'answerContent': '已工作'
			}],
			'answerResult': 4
		},{
			'questionNo': 3,
			'questionContent': '您与家庭成员的收入状况是?',
			'list': [{
				'answerNo': 1,
				'answerContent': '我与配偶均有稳定的收入'
			},{
				'answerNo':2,
				'answerContent': '我与配偶其中一人有稳定的收入'
			},{
				'answerNo':3,
				'answerContent': '我与配偶均没有稳定的收入，或均已退休'
			},{
				'answerNo':4,
				'answerContent': '我本人有稳定的收入'
			},{
				'answerNo':5,
				'answerContent': '我本人目前暂无稳定的收入'
			}],
			'answerResult': 1
		},{
			'questionNo': 4,
			'questionContent': '您的可配置资金总额是多少?,（选填项）您可配置的美元资产金额是多少?',
			'list': [],
			'answerResult': '10000000, 1111110000000'
		},{
			'questionNo': 5,
			'questionContent': '您家庭月度固定开销金额大约是多少?',
			'list': [{
				'answerNo': 1,
				'answerContent': '2万元以下'
			},{
				'answerNo':2,
				'answerContent': '2万元至5万元'
			},{
				'answerNo':3,
				'answerContent': '5万元至10万元'
			},{
				'answerNo':4,
				'answerContent': '10万元至20万元'
			},{
				'answerNo':5,
				'answerContent': '20万元以上'
			}]
		}]
});

//把生成的假数据当做模块输出
module.exports = data;