/**
 * 与被保险人关系 下拉列表
 * @author zhangweipeng 2017-11-16
 */



var contactList = [
	
	{
		name: '本人',
		num: '0'
	},
	{
		name: '父亲',
		num: '1'
	},
	{
		name: '母亲',
		num: '2'
	},
	{
		name: '妻子',
		num: '3'
	},
	{
		name: '丈夫',
		num: '4'
	},
	{
		name: '儿子',
		num: '5'
	},
	{
		name: '女儿',
		num: '6'
	}
	
];

var list = [];
$.each(contactList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

export default list