/**
 * ajax请求的封装
 * @author  yangjinlai  
 * 
 * 参数说明：
 * 1. obj是传进来的ajax发送请求的配置，是一个数组，里面每一条数据都是一个对象，对应一个ajax请求，
 *    数组里有几个对象，就会发几个请求
 *    obj格式：
 *    var obj = [
   *    {
   *      url: site_url.banner_url,
          data: {
              ……
          },
          callbackDone: function(){},
          callbackFail: function(){},  
          ……
   *    },
   *    {
   *      url: site_url.banner_url,
          data: {
              ……
          },
          callbackDone: function(){},
          ……
   *    },
   *    ……
 *    ]
 * 2. headAjax标识是否是头部的接口，传true意思为头部，不传或者传其他值表示不是头部接口
 *    accountLeft标识是否是我的资产-左树的接口，true-是，false或不传-不是
 *    在判断整个页面的ajax初始化请求是否完成时，会根据headAjax和accountLeft判断是否有头部/左树接口
 *
 * 
 * obj中，每一条数据(ajax请求)的默认参数说明：
 *  url: '', //接口地址
  data: {}, //需要传给接口的数据
  type: 'POST', //post/get
  dataType: 'JSON', 
  async: true, //true-异步  false-同步
  needLogin: false, //发送请求时，需要判断登录是否过期  true-需要，false-不需要，默认false
  needCrossDomain: false,  //true-跨域, false-不跨域，默认false
  needDataEmpty: true, //需要判断data是否为空  true-需要  false-不需要，默认true
  needLoading: false, //不需要显示loading遮罩  true-需要，false-不需要，默认false
  
  callbackDone: function(){},  
  //接口成功的回调函数（如果needDataEmpty=true，则需要判断data.data是否为空，如果为空，不调用
  callbackDone，而调用callbackNoData） 
  
  callbackFail: function(){},  
  //请求失败，或接口成功但data.status=1时的回调函数
  
  callbackNoData: function(){}   
  //接口成功，但data.data没有数据时的回调函数（此时needDataEmpty=true）


 *                   
 * 3个函数：
 * 1. ajaxFunc  发送请求
 * 2. sendAjax  循环obj 调用ajaxFunc，发送每一次的请求
 * 3. isEmpty 判断data.data是否为空
 *
 * 
 * 本插件使用方式：
 * $.ajaxLoading(obj);  
 * 
 * 修改：7/18，添加app交互判断登录状态的处理
 *
 */


//require('./components/utils.js');

//黑色提示条的显示和隐藏
//var tipAction = require("./tipAction.js");
//base64编码，在需要跳转登录页时编码当前页面地址栏的url
var Base64 = require('../../web/include/vendor/base64/base64.js');

//弹层
require('../../common/components/otherComponents/elasticLayer/typeOne/elasticLayer.js');

//如果是app，判断登录状态
//var appIsLogin = require("./components/app/needLogin.js");

//默认配置
var defaults = {
  url: '',
  data: {},
  type: 'POST',
  dataType: 'json',
  async: true, //true-异步  false-同步
  needLogin: false, //需要判断登录是否过期
  needCrossDomain: false, //true-跨域, false-不跨域
  needDataEmpty: true, //需要判断data是否为空
  needLoading: false, //不需要显示loading遮罩
  goLoginNow: false, //判断CF0004后是否需要跳转到登录页面，true--不跳转, false---跳转
  callbackDone: function() {},
  callbackFail: function() {},
  callbackNoData: function() {},

  //formData
  formData: false, //判断是否需要使用formData上传
  callbackLoginFunc: function() {}, //如果未登录不需要跳转，执行此函数 
  appRisk: false, //当需要与app交互时
};

;
(function($) {

  $.extend($, {

    ajaxLoading: function(json) {

      if (!util.objIsNotEmpty(json)) {
        //json没有的时候，不执行后面的逻辑
        console.log('ajax请求出现错误，json为空');
        return false;
      }

      //声明obj，作为json数组合并后的新数组，用于循环发送ajax请求
      var obj = [];

      //循环合并json，生成最终数据
      $.each(json, function(i, el) {
        //获取真正的参数
        if (!!el.url) {
          if (site_api[el.url]) {
            var a_param = util.objDeepCopy(site_api[el.url]);

            if (!!a_param) {
              //接口路径 
              el.url = a_param.url;
              //接口参数
              var p_param = $.extend({}, a_param.param.param, el.data);
              a_param.param.param = p_param;
              //重置el.param
              el.data = a_param.param;
            }
          }
        }
        //此时el.url为接口路径
        //el.param为接口参数
        obj.push($.extend({}, defaults, el));
      })

      //用于当某些ajax请求不需要隐藏loading遮罩的情况
      if (json.hasOwnProperty('continueLoading') && json.continueLoading) {
        obj.continueLoading = json.continueLoading;
      }


      //发送ajax请求
      var ajaxFunc = function(obj) {

        var ajax = $.Deferred(); //声明一个deferred对象

        //设置ajax请求的contentType  data数据添加JSON.stringify
        var contentType = $.ajaxSetting.contentType,
          data = {};

        //设置ajax请求的contentType  data数据添加JSON.stringify
        // var contentType = env == 0 ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8',

        //  data = env != 0 && !obj.formData ?  JSON.stringify(obj.data) : obj.data; 

        if ($.ajaxSetting.needJSON) { //如果非开发环境
          data = JSON.stringify(obj.data);
        } else { //开发环境
          if (obj.data) {
            var p = obj.data.param;
            for (var i in p) { //将数组类型的字段改成字符串
              if (util.getVarType.isArray(p[i]) == 'array') {
                p[i] = p[i].toString();
              }
            }
            data = obj.data.param;
          }
        }


        if (obj.needCrossDomain) {
          //跨域
          var ajaxJson = {
            url: obj.url,
            data: data,
            contentType: contentType,
            type: obj.type,
            dataType: obj.dataType,
            async: obj.async,
            //跨域需要以下配置
            jsonp: "callback",
            //jsonpCallback: 'callback',
            crossDomain: true,
            //这段代码不能注释，否则跨域时cookie带不过去
            xhrFields: {
              withCredentials: $.ajaxLoading.needJSON ? true : false
            },
            headers: {
              "X-Requested-With": 'XMLHttpRequest',
            },
          };

          if (!$.ajaxLoading.needJSON) { //如果是本地开发则使用模拟数据，不需要添加headers
            delete ajaxJson["headers"];
          };
          ajax = $.ajax(ajaxJson);
        } else if (obj.formData) {
          //使用formData格式上传
          ajax = $.ajax({
            url: obj.url,
            data: data,
            contentType: contentType,
            type: obj.type,
            dataType: obj.dataType,
            async: obj.async,
            contentType: false,
            processData: false,
            // jsonp: "callback",
            //jsonpCallback: 'callback',
            xhrFields: {
              withCredentials: $.ajaxLoading.needJSON ? true : false
            },
          })
        } else {
          //普通上传
          ajax = $.ajax({
            url: obj.url,
            data: data,
            contentType: contentType,
            type: obj.type,
            dataType: obj.dataType,
            async: obj.async,
            // jsonp: "callback",
            //jsonpCallback: 'callback',
            xhrFields: {
              withCredentials: $.ajaxLoading.needJSON ? true : false
            },
          })
        }

        ajax.done(function(data) {

          if (data.code != '0000') {
            //非成功请求
            if (obj.needLogin && data.code == 'CF0004') {
              if (window.currentIsApp) {
                //如果未登录，且不需要跳转
                if (obj.goLoginNow) {
                  obj.callbackLoginFunc(data.data);
                  return false;
                } else {
                  $('#script_login').attr('src', 'appHref://appLogOut');
                  return false;
                }
              } else {
                //非app
                if (obj.goLoginNow) {
                  //如果未登录，且不需要跳转，执行对应函数
                  obj.callbackLoginFunc(data.data);
                  return false;

                } else {
                  //需要跳转
                  window.location.href = data.data;
                  //这里直接抛出异常，若ajax嵌套执行，代码走到这里就不会再走下去，
                  //防止window.location.href在执行完请求里的所有代码之后再跳转
                  throw '跳转登录';
                  return false;
                }
              }
            } else if (data.code == '1000') {
              //|| !util.objIsNotEmpty(data.data)){
              //数据为空，如果有传callbackNoData，执行
              obj.callbackNoData();
              return false;
            } else if (data.code == '4010') {
                //需要实名认证，出现弹层
                $.elasticLayer({
                    p: '此险种需要实名认证才能购买，您尚未实名，是否继续进行实名认证？',
                    yesCel: '取消',
                    yesTxt: '确定', 
                    zIndex: 250,
                    callbackCel: function(t) {
                        //点击取消后跳转
                        t.hide();
                    },
                    callback: function() {
                        //点击确定后跳转
                        window.location.href= go_url.realName_url.go;
                    }
                })
            } else {
              obj.callbackFail(data);
              return false;
            }
          } else {
            //数据请求成功且不为空，执行成功的回调函数
            obj.callbackDone(data);
          }
        })

        //ajax错误的情况
        //ajax.fail(function(data, result, msg) {
          //obj.callbackFail(data);
          //tipAction(msg);
        //})

        return ajax;
      }


      //循环调用ajaxFunc，
      //发送ajax请求前后的各种逻辑，
      //判断页面初始化请求是否全部成功
      var sendAjax = function() {

        var dtd = $.Deferred(); // 新建一个deferred对象


        var length = obj.length, //当前ajax请求的数量
          arr = 0; //存放已成功的请求数量

        //循环obj数组
        $.each(obj, function(i, el) {

          //发送请求前，先判断是否需要显示遮罩
          if (el.needLoading) {
            //needLoading为true时，显示$('#loading')遮罩
            $("#loading").show();
          }

          //调用ajaxFunc，发送ajax请求
          var ar = ajaxFunc(el);

          //ajax请求之后的处理
          ar.fail(function() {

              //ajax请求不成功的时候
              console.log('失败了');
              //手动将dtd置为reject
              dtd.reject();
              //标识请求未成功
              //window.ajaxLoadingFalse = true;
            })
            .done(function() {

              //ajax请求成功，arr+1
              arr += 1;

              if (length == arr) { //如果所有接口都已发送完毕

                dtd.resolve();
              }
            })
        })

        //监听dtd的状态，进行遮罩loadiing处理
        $.when(dtd)
          .fail(function() {
            //失败状态
            console.log('失败了');

            setTimeout(function() { //过10秒钟，隐藏遮罩
              $("#loading").hide();
            }, 15000)

          })
          .done(function() {
            //成功状态
            console.log('ajax请求全部成功')
            $("#loading").hide(); //数据请求成功 遮罩隐藏
          })
      }

      //调用sendAjax，发送请求
      sendAjax();

    },

  })

})(Zepto);
