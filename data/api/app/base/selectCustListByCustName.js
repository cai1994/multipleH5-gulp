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
                 "customerId|1":  "001",// 客户编号
                 "customerName|1": "张三", //客户名称
                 "customerType|1":  "001",// 客户类型
                 "customerSource|1":  "1",// 客户类型
            }
         ]
	// }
    
});
module.exports=mymessage;
