/*
 * @page: 职业类型查询
 * @Author: songxiaoyu
 * @Date:   2018-08-06 19:18:39
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-08 16:13:29
 * @description:
 */

/*require('../js/components/utils.js');
require('../js/ajaxLoading.js');
if (window.location.href.indexOf('realNameStepOne') != -1 || window.location.href.indexOf('bassMessage') != -1) {
  var list = [];
  var obj = [{
    url: site_url.queryDataDictionary_api,
    data: {
      hmac: "", //预留的加密信息     
      params: { //请求的参数信息
        keyNo: "1027", //数据字典key
        sysName: "TA" //系统名称    
      }
    },
    needLogin: true,
    async: false,
    callbackDone: function(json) {
      //保存获取到的银行信息    
      var jsonData = json.data;
      if (!$.util.objIsEmpty(jsonData)) {
        $.each(jsonData, function(i, el) {
          if (!(el.keyValue == "#")) {
            list.push({
              value: el.keyValue,
              text: el.caption
            })
          }
        })
      }
    },
    callbackFail: function(json) {

    }
  }];
  $.ajaxLoading(obj);
  module.exports = list;
}*/

module.exports = [
    {
        value:'0',
        text:'公务员'
    },
    {
        value:'1',
        text:'老师'
    },
];