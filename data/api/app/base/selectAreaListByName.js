/*

  活动培训-获取所属区域

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "status": "1000",
    "message": "请求成功！",
    // "data":{
         "data|20":[
            {
                 "code|1":  "001",// 区域id
                 "name|1": "北京", //区域名称
            },
            {
              "code|1":  "0011",// 区域id
              "name|1": "北京1", //区域名称
            }
         ]
	// }
    
});
module.exports=mymessage;
