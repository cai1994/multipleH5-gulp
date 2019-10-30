/**
 * 获取指定日期，格式：YYYY-MM-DD
 *
 * 返回一个对象，包括此刻的年月日时分秒
 * 
 * @author  yangjinlai
 * @time 2016-09-27
 *
 * 添加了往后推几天或往前推几天的功能(setDate())
 * 如果算月份的话可以用setMonth()
 * 算年用setYear()
 * 网上资料：https://www.cnblogs.com/gmq-sh/p/5194706.html
 */

//获取当前时间，格式
//type==word时，单位为年月日
module.exports = function getNowDate( action, day ) {

    
    var date = !!day ? day : new Date(),
        strDate = date.getDate();

    if( !!action ){
        if( action.type == 'add' ){
            if( !!action.dayNumber ){
                //加几天
                date.setDate(strDate + action.dayNumber);
            }
        }
        else{
            //减
            if( !!action.dayNumber ){
                //减几天
                date.setDate(strDate - action.dayNumber);
            }
        }
    }

    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        strDate = date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    return {
        year: year,  //年
        month: month, //月
        date: strDate, //日
        hour: hour, //时
        minute: minute, //分
        second: second //秒
    };
}

//获取前一天时间，格式YYYY-MM-DD
// function getPassFormatDate() {
//     var   today=new   Date();      
//       var   yesterday_milliseconds=today.getTime()-1000*60*60*24;    
//       var   yesterday=new   Date();      
//       yesterday.setTime(yesterday_milliseconds);      
//       var strYear=yesterday.getFullYear(); 
//       var strDay=yesterday.getDate();   
//       var strMonth=yesterday.getMonth()+1; 
//       if(strMonth<10)   
//       {   
//           strMonth="0"+strMonth;   
//       }   
//       var strYesterday=strYear+"-"+strMonth+"-"+strDay;
//     return strYesterday;
// }