
/**接口请求封装
 * @author huarunsong 2019-02-20
 * 参数说明
 * opt:
 * * ****name:具体业务请求名称
 * * ****method:默认POST
 * * ****url:接口路径
 * * ****params或data:具体业务请求参数
 * * ****needFailCallback:是否需要单独处理非0000状态的回调函数，true是需要，false默认不需要直接公用方法处理
 * * ****beforeSend:请求前
 * * ****complete:请求后
 */


import _axios from "./axios";
import tipAction from "@common/components/otherComponents/tipAction/tipAction"

var axiosHttp = {

        http(opt, callback, failCallback) {

                let opts = opt || {};
                if (!opts.url) {
                    console.error('缺少请求地址');
                    return false;
                }
                if (opts.method === undefined) opts.method = 'POST';
                if (opts.loading && !opts.beforeSend) {
                    opts.beforeSend = () => {
                        //utils.openLoading();
                    }
                }
                if (opts.loading && !opts.complete) {
                    opts.complete = () => {
                        //utils.closeLoading();
                    }
                }

                
                if (opts.beforeSend) opts.beforeSend()
                return _axios({
                    method: opts.method,
                    url: opts.url,
                    params: opts.params || {},
                    data: opts.data ? JSON.stringify(opts.data) : {},
                    //timeout: 15000,
                }).then(response => {
                    
                    if (opts.complete) opts.complete();
                    if(opts.needFailCallback){

                        if(response.data.status == '0000'){

                            callback && callback(response) 

                        }
                        else if(response.data.status == '1000'){
                            //操作成功，数据为空
                            failCallback && failCallback(response, '1000')

                        }
                        else
                        {
                            failCallback && failCallback(response)
                        }
      

                    }
                    else //状态码是1000判断不需要回调函数，如表单或者详情接口
                    {
                        if( response.data.status == '0000' ){

                            callback && callback(response) 

                        }
                        else
                        {
                            tipAction(response.data.message);

                        }
                    }
                    

                }, response => {

                    if (opts.complete) opts.complete();

                    if(opts.needFailCallback){

                        //调用失败的方法处理
                        failCallback && failCallback(response)
                    }

                    console.error((opts.name || '') + "请求失败");

                }).catch(response => {

                    if (opts.complete) opts.complete();
                   
                    console.error((opts.name || '') + "请求异常", response);
                   
                });
            }
}

export default axiosHttp
