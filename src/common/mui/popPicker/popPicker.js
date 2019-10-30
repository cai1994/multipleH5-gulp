/**
 * muiPicker---理顾宝项目特用--取值模式使用vue的
 * @author huarunsong 2019-02-21
 * 
 * ****pickerSelect--下拉列表，
 * @params: 
 * pickerList--需要显示的数据，格式是已经处理好的
 * callback--选择数据后的回调函数，可用于显示数据或其他操作
 * 
 * *****pickerDate--日历下拉，
 * @params: 
 * dateOptions--日期格式参数
 * callback--选择数据后的回调函数，可用于显示数据或其他操作
 */
import '@common/vendor/mui/js/mui.picker.min.js';  //MUI日历和下拉菜单

import '@common/components/muiComponents/muiPop/popPicker.js'; //MUI下拉菜单

 

let pickerUtil={

        pickerSelect:function(pickerList,callback){
            var picker = new mui.PopPicker();
            picker.setData(pickerList);
            picker.show(function (selectItems) {
                callback(selectItems);
                $(".mui-poppicker").remove();

            })

        },

        pickerDate:function(dateOptions,callback){
            var dtPicker = new mui.DtPicker(dateOptions); 
            dtPicker.show(function (selectItems) { 
                callback(selectItems);
            })

        }
     }
    

 export default pickerUtil;