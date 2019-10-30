/**
 * 有无社保下拉列表
 * @author zhangweipeng 2017-11-16
 */

var shebaoList = [
	
	{
		name: '无',
		num: '0'
	},
	{
		name: '有',
		num: '1'
	}
	
];

var list = [];
$.each(shebaoList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

export default list