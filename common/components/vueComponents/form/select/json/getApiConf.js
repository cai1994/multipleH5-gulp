/*
* @page: 需要请求api的配置
* @Author: songxiaoyu
* @Date:   2018-08-09 10:39:20
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-08-09 19:52:24
* @description:
*/

var getApiConf = {
    // 预约单号
    "get_reservationNumber": {
        config:site_api.myReservation_api,
        responseParam:"reservationId"
    },
};
module.exports = getApiConf;