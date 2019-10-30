/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2018-08-15 16:09:11
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-20 17:27:54
 * @description:
 */

var checkFunc = require('./checkFunc.js');

var checkList = {
  'isEmpty':[{type:'isEmpty'}],
  'name': [{type:"isNameCheck",tip:'请输入真实姓名'}],
  'phone': [{type:"isAllNumber",tip:'手机号码格式有误'},{type:"isLength",tip:'请输入11位手机号码'}],
  'email': [{ type: "isEmailCheck", tip: '邮箱地址格式不正确！请重新输入' }],
  'reservationNumber':[{ type: "isReservationNumber"}]
};

module.exports = checkList;
