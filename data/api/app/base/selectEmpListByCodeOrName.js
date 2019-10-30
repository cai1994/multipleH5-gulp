/*

  获取陪访理顾

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "status": "0000",
    "message": "请求成功！",
    // "data":{
         "data|2":[
            {
                 "code|1":  234324,// 理顾编号
                 "name|1": "张三", //理顾名称
                 "deptCode|1":  'null',// 部门编号
                 "deptName|1": "张三" //部门名称
            }
         ]
	// }
    
});
module.exports=mymessage;
