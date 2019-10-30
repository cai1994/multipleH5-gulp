/*
 * @page: 排名标签列表
 * @Author: songxiaoyu
 * @Date:   2019-05-13 13:50:52
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": [
        {
            "code": "1",
            "name": "全国排名"
        },
        {
            "code": "2",
            "name": "事业群排名"
        },
        {
            "code": "3",
            "name": "事业群排名"
        },{
            "code": "4",
            "name": "事业群排名"
        },{
            "code": "5",
            "name": "事业群排名"
        },{
            "code": "6",
            "name": "事业群排名"
        }
    ],
    "message": "查询成功",
    "status": "0000"

});

module.exports = data;
