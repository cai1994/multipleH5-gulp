/**
 * 证件类型 下拉列表
 * @author zhangweipeng 2017-11-16
 */

var idTypeList = [
	
	{
		name: '身份证',
		num: '0'
	},
    {
        name: '本国护照',
        num: '1'
    },
    {
        name: '外国护照',
        num: '6'
    },
    {
        name: '港澳居民来往内地通行证',
        num: '10'
    },
    {
        name: '台湾居民来往大陆通行证',
        num: '14'
    }      	
];

var list = [];

$.each(idTypeList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

export default list