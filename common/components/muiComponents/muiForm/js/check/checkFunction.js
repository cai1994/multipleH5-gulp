/**
 * @author yangjinlai 2018-01-31
 * 
 * 校验函数
 * 
 * 所有参数意义一样：
 *
 * str：
 * 校验内容（如input text时为输入框的值，下拉列表时为num值等）
 * $el：
 * 校验的对象（当前校验的这一条表单元素中needCheck=true的节点，如input输入框，check复选框等）
 * param：
 * 传递进来的参数，有些方法有的没有
 *
 * 若校验通过，返回true，校验不通过，返回false
 *
 * 参数param的具体说明，见checkList.js
 */


import regList from '../../../../../js/util/regList.js'


export default {

    //是否为空的校验
    isEmpty : function(str, $el ){
        
        console.log('1. '+ $el +'是否为空   str:'+str);
        
        if( !str || !str.length ){
            //为空
            return false;
        }
        return true;
    },

    //字符串长度校验  
    isLength: function(str, $el, leng){
        var that = this;
        
        if(str.length != leng.length ){
            return false;
        }
        return true;
    },


    //判断输入的姓名的格式
    isNameCheck: function(str){
        var that = this;
        var r = regList.isNameCheck(str);
        if( !r){ //格式错误
            return false;
        }
        return true;
    },

   
    isEmailCheck:function(str){
      var that = this;

      var r = regList.checkEmail(str);
      if( !r){ //格式错误
          return false;
      }
      return true;

    }

}