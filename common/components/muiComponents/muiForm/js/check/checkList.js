/**
 * @author yangjinlai 2018-01-31
 * 
 * 表单元素的校验方法的配置
 *
 * （注释为原PC表单时所写，企金去掉了一些功能，但注释暂时保留）
 *
 * 本文件中，导出了一个对象，该对象中存放了所有需要校验的表单元素的校验配置
 * 包括需要做什么校验，校验方式，错误提示等等
 * （本文件中只是配置，校验函数都在checkFunction.js中）
 *
 * 校验配置格式如下:
 * 'abc': {
 *      checkEvent: [
           {action：***, type: checkFunc.*** ,tip: '***', param: *** ,replaceList: [{},{},……]},
           ……
        ],
 *  }
 *  其中，
 *  1. 'abc'的abc，是与表单元素的check属性值对应的，在做校验的时候，会通过check属性值
 *  在本文件中寻找对应的校验配置
 *  2. checkEvent为一个数组，里面的每一条数据都是一条校验配置，属性说明如下：
 *     action--在什么时候做校验，具体说明见下方
 *     type--需要调用什么校验方法
 *     tip--该条校验未通过时的错误提示
 *     param--需要给该条校验方法传递的参数，具体说明见下方
 *     replaceList--需要替换错误提示中的文案，具体说明见下方
 *
 *
 *
 * ********对action属性的说明：
 *
 * 表单元素需要校验的情景可以分为如下4种：
 * 1. 表单提交时校验
 * 2. 点击发送短信验证码时校验
 * 3. 离焦时校验
 * 4. 需要针对某个或某些表单元素校验
 *
 * 有些校验在离焦时不做，但在表单提交/发送短信验证码时做，如图文验证码是否正确
 * 因此需要对这种情况做处理，处理方式如下：
 *
 * 在checkEvent数组中每一条的配置上，添加action属性，默认为all，表示以上4种情况下都校验
 * 若action为submit，表示仅在1.2情况校验
 *
 * eg:
 *  'twyzm' : { //图文验证码
        checkEvent: [
           {action：all, type: checkFunc.isEmpty ,tip: '请输入图文验证码'},
           {action：all, type: checkFunc.isLength, tip:'请输入4位图文验证码', param:{length:4} },
           {action：submit, type: checkFunc.isTwyzmCheck, tip:'图文验证码输入错误'}
        ]
    }
 *
 *
 *
 *
 *
 * *********对param参数的说明：
 *
 * 有一些校验方法需要传递参数：
 *
 * 1. isQrPwCheck() 确认密码的校验
 *     参数param：'***'
 *     ***表示需要比对的密码输入框的cardAttr属性值，如'loginPassword'
 *
 * 2. isLength()，字符串长度校验
 *     参数param: ***
 *     ***表示需要的字符串的长度，如4, 6, 10等
 *
 * 3. isNumSmall()，判断是否小于某个数字
 *     参数param: { type: '', smallNum:  }
 *     type表示该数字是直接写死在这里，还是在校验对象的属性值上
 *     （1）写死的
 *     param: {type：'num', smallNum: 100}，此时type==num，直接使用smallNum的值做判断
 *     (2)在属性值上
 *     param: {type: 'attr', smallNum: 'attrName'}，此时type==attr，去校验对象上找该属性值做判断
 *
 * 4. isNumBig()，判断是否大于某个数字
 *     参数param: { type: '', bigNum:  }
 *     type表示该数字是直接写死在这里，还是在校验对象的属性值上
 *     （1）写死的
 *     param: {type：'num', bigNum: 100}，此时type==num，直接使用bigNum的值做判断
 *     (2)在属性值上
 *     param: {type: 'attr', bigNum: 'attrName'}，此时type==attr，去校验对象上找该属性值做判断
 *
 * 5. isMathMultiple()，判断是否是某个数的整数倍
 *     参数param: { type: '', multiTipleNum:  }
 *     type表示该数字是直接写死在这里，还是在校验对象的属性值上
 *     （1）写死的
 *     param: {type：'num', multiTipleNum: 100}，此时type==num，直接使用bigNum的值做判断
 *     (2)在属性值上
 *     param: {type: 'attr', multiTipleNum: 'attrName'}，此时type==attr，去校验对象上找该属性值做判断
 *
 * 6. isRedemSurplus()， 判断bigNum-str和resultNum的关系（str是输入框的值）
 *     参数param: { bigType: 'attr', resultType: 'num', bigNum: 'maxNum', rusultNum: 1000000 }
 *     bigType和resultType与上面几条里的type是一样的概念，分别指bugNum和resultNum是直接使用的数值
 *     还是从属性值取
 *
 * 7.
 *
 *
 *
 *
 * **********对replaceList的说明：
 *
 * 因错误提示中，有些数据是需要从接口拿到的，因此需要预留出该数据的位置，在错误提示时替换成正确的数据
 *
 * 格式：
 * 1. replaceList: [{replaceName: '***', attrName: '****'}]
 * 或
 * 2. replaceList: [{replaceName: '****', num: ***}]
 * 或
 * 3. replaceList: [{replaceName: '***'}]
 *
 * 分别代表不同情况；
 *
 * 1. replaceName表示需要替换的文案，attrName表示数据是校验对象上的该属性值
 * 2. replaceName表示需要替换的文案，num表示直接使用该数据替换，数据类型为Numer
 * 3. replaceName表示需要替换的文案，没有其他属性值，表示使用校验对象的val()替换
 *
 */



//引入checkFunction.js
import checkFunc from './checkFunction.js'

export default {

    checkList : {

      //只判断是否为空
      'empty': {  
        checkEvent: [
            { type: checkFunc.isEmpty},
        ]
      },
      //订单提交页面的阅读并同意
      'checked': {
          tip: '请阅读并同意'
      },
      //手机号
      'phone': { 
          checkEvent: [
              { type: checkFunc.isEmpty, tip: '请输入11位手机号码' },
              { type: checkFunc.isLength, tip: '请输入11位手机号码', param: { length: 11 } }
          ]
      },

      'name': { //姓名
          checkEvent: [
              { type: checkFunc.isEmpty, tip: '请输入姓名' },
              { type: checkFunc.isNameCheck, tip: '请输入真实姓名' },
          ]
      },
      'num_1': { //证件号1
          checkEvent: [
              { type: checkFunc.isEmpty, tip: '请输入证件号码' },
          ]
      },
      
      'email': { //经营范围
          checkEvent: [
              { type: checkFunc.isEmpty, tip: '请输入邮箱地址' },
              { type: checkFunc.isEmailCheck, tip: '邮箱地址格式不正确！请重新输入' },
          ]
      }
    },
    checkFunc: checkFunc
};