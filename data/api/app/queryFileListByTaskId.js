/*
 * @page: 根据任务主键查询附件列表 
 * @Author: songxiaoyu
 * @Date:   2019-05-13 13:49:17
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "message": "查询附件列表成功",
    "status": "0000",
    "data": [{
        "fileName": "下载模板 (2).xls",
        "fileSize": 26,
        "id": 10051,
        "resUrl": "M00/01/BA/rBCjPlsVBQKANZZHAABoAF4cGfw162.xls",
        "taskId": 1
    }],

});

module.exports = data;
