/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2018-08-15 19:09:52
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-20 18:03:04
 * @description:
 */
var checkConf = require('./checkConf.js');
var checkFunc = require('./checkFunc.js');

// 循环调用
var eachCallFunc = function(checkType, modelText) {

  var arr = checkConf[checkType];
  var tip = '';

  for ( var  obj in arr ){
      var name = arr[obj]["type"];
      var result = checkFunc[name](modelText);
      if (!result) {
        // 校验未通过
        tip = arr[obj]["tip"];
        break;
      }
  }

  // for (var  obj of arr) {
  //   var name = obj["type"];
  //   var result = checkFunc[name](modelText);
  //   if (!result) {
  //     // 校验未通过
  //     tip = obj["tip"];
  //     break;
  //   }
  // }
  // var _iteratorNormalCompletion = true;
  // var _didIteratorError = false;
  // var _iteratorError = undefined;

  // try {
  //   for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
  //     var obj = _step.value;

  //     var name = obj["type"];
  //     var result = checkFunc[name](modelText);
  //     if (!result) {
  //       // 校验未通过
  //       tip = obj["tip"];
  //       break;
  //     }
  //   }
  // } catch (err) {
  //   _didIteratorError = true;
  //   _iteratorError = err;
  // } finally {
  //   try {
  //     if (!_iteratorNormalCompletion && _iterator.return) {
  //       _iterator.return();
  //     }
  //   } finally {
  //     if (_didIteratorError) {
  //       throw _iteratorError;
  //     }
  //   }
  // }
  return tip;
};

// 只有需要校验的才进来
var checkDirective = function(el, binding, vNode) {
  el.addEventListener('checkForm', function(event) {
    var elVue = vNode.context;
    // 首先去除已有样式
    el.className = el.className.replace('input-error', '').trim()

    if (!!elVue.modelText) {
      // 非空-进校验--如果是默认值，在校验中可返回false;
      // result--Kong，通过；非空，报错
      var result = eachCallFunc(elVue.check, elVue.modelText);
      if (!!result) {
        // 校验失败--提示tip
        tipAction(result);
        el.className += ' input-error';
        return;
      }else if(result == undefined){
        // 提示---errortip
        tipAction(elVue.errortip);
        el.className += ' input-error';
        return;
      }
    } else {
      // 空--默认提示errorTip
      tipAction(elVue.errortip)
      el.className += ' input-error';
      return;
    }
  })
}
export default checkDirective;
