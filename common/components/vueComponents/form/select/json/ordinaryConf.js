/*
 * @page: 不用请求接口的select配置
 * @Author: songxiaoyu
 * @Date:   2018-08-09 11:19:31
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-15 14:27:20
 * @description:
 */
// 职业

var ordinaryConf = {
  // 性别
  "sexSelect": [{ value: '0', text: '男' }, { value: '1', text: '女' }],
  // 公务员
  "vocaSelect": [{value: '0',text: '公务员'},{value: '1',text: '老师'}],
  // 与被保人关系
  "insuredRelation":[{ value: '0', text: '本人' }, { value: '1', text: '配偶' },{ value: '5', text: '子女' }],
  // 证件类型
  "identityType":[{ value: '0', text: '身份证' }, { value: '1', text: '护照' },{ value: '5', text: '港澳通行证' },{ value: '5', text: '台湾通行证' }],
  // 有无社保
  "socialSecurity":[{ value: '0', text: '没有' }, { value: '1', text: '有' }],
  // 质子重离子治疗
  "proton":[{ value: '0', text: '否' }, { value: '1', text: '是' }]
};
module.exports = ordinaryConf;
