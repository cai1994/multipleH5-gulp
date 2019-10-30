/**
 * 质子重离子下拉列表
 * @author zhangweipeng 2017-11-16
 */

var zhiziList = [
	
	{
		name: '是',
		num: '1'
	},
	{
		name: '否',
		num: '0'
	}
	
];

var list = [];
$.each(zhiziList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

export default list