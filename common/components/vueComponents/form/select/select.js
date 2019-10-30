/*
 * @page: select逻辑判断
 * @Author: songxiaoyu
 * @Date:   2018-08-08 16:39:56
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-21 17:05:59
 * @description:
 */

// 

require('../../../../../web/include/vendor/mui/mui.picker.min.js');
var Event = require('../common/event.js');
var popPicker = require('../../../muiComponents/muiPop/muiPopPicker.js');
var getApiConf = require('./json/getApiConf.js');
var ordinaryConf = require('./json/ordinaryConf.js');


var judgeType = function(type, vNode) {
  var data = [];

  if (ordinaryConf.hasOwnProperty(type)) {
    // 普通配置
    data = ordinaryConf[type];
  } else if (getApiConf.hasOwnProperty(type)) {
    // 请求接口的select配置
    data = vNode.context.selectData;
  } else {
    throw new Error('select judge Type error')
  }
  return data;
};

var select = {
  'birthFunc': function(el, binding, vNode) {
    var dtpicker = new mui.DtPicker({
      type: "date", //设置日历初始视图模式 
      beginDate: new Date("1901", "00", "01"), //设置开始日期 
      endDate: new Date(), //设置结束日期 
      labels: ['年', '月', '日'], //设置默认标签区域提示语 
    });
    dtpicker.show(function(selectItems) {
      vNode.context.modelText = selectItems.text;
      dtpicker.dispose();
    })
  },
  'default': function(el, binding, vNode) {
    var type = vNode.data.attrs.selectType,
      data = judgeType(type, vNode);
    if (!util.objIsNotEmpty(data)) {
      tipAction('暂无数据')
    } else {
      popPicker(1, data, el, vNode);
    }
  },
};


/**
 * [exports description]
 * @author songxiaoyu 2018-08-08
 * @param  {[type]} el      [vue指令对应的el]
 * @param  {[type]} binding [vue指令对应的binding]
 * @param  {[type]} vNode   [vue指令对应的vNode]
 */
module.exports = function(el, binding, vNode) {
  var type = vNode.data.attrs.selectType;

  switch (type) {
    case 'birthSelect':
      select.birthFunc(el, binding, vNode);
      break;
    default:
      select.default(el, binding, vNode);
      break;
  }
}
