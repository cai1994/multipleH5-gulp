/*
 * @page: 我的下属标签列表
 * @Author: songxiaoyu
 * @Date:   2019-05-20 15:22:16
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({

    "data": [{
        "code": "2",
        "name": "事业群"
    }, {
        "code": "3",
        "name": "事业部"
    }, {
        "code": "3",
        "name": "事业部"
    }, {
        "code": "3",
        "name": "事业部"
    }, {
        "code": "3",
        "name": "事业部"
    }],
    "message": "查询成功",
    "status": "0000",
    // "status": "1000"

});

module.exports = data;
