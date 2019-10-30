/*
 * @page: 需请求接口的select配置
 * @Author: songxiaoyu
 * @Date:   2018-08-09 09:40:47
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-16 13:48:46
 * @description:
 */

// 
var getApiConf = require('./getApiConf.js');
var list = [];

module.exports = function(selecetType) {
  var ajaxArr = [];
  ajaxArr.push({
    url: getApiConf[selecetType].config.url,
    data: getApiConf[selecetType].config.param,
    needLogin: true,
    async: false,
    callbackDone: function(json) {
      var data = json.data;
      // if (!$.util.objIsEmpty(data)) {
        $.each(data, function(i, el) {
          list.push({
            value: el.common,
            text: el[getApiConf[selecetType].responseParam]
          })
        })
        return list;
      /*} else{
        throw new Error('getApiData is Empty');
      }*/
    },
    callbackFile: function(json) {},
  });
  $.ajaxLoading(ajaxArr);
  return list;
};
