// var aa = require('../ajax/axiosHttp.js')
import axiosHttp from '@common/js/ajax/axiosHttp.js'
//引入本项目所需的其他文件
// import mdPathList from '@common/js/md/path/lgbPathList.js'
var mdPathList = require('./path/lgbPathList.js')
var mdClickList = require('./click/lgbClick.js')

//环境变量和埋点域名的对应 
var mdDomain = '',
    min = false;
if (window.env == '0' || window.env == '5') {
    // mdDomain = "http://localhost:8000"
    mdDomain = "https://dc.qasa.chtfundtest.com"; //本地测试埋点
    // mdDomain = "https://dc.uata.haomalljf.com"; //本地测试埋点
} else if (window.env == '2' || window.env == '2_b' || window.env == '1' || window.env == '5') {
    // mdDomain = "https://dc.chtwmtest.com";
    mdDomain = "https://dc.qasa.chtfundtest.com";//新测试地址
} else if (window.env == '3' || window.env == '3_b') {
    min = true;
    // mdDomain = "https://dc.uata.haomalljf.com";
    mdDomain = "https://dc.uata.haomalljf.com";//新
} else {
    min = true;
    // mdDomain = "https://dc.chtwm.com";
    mdDomain = "https://dc.chtfund.com";//新
}
if (window.location.href.indexOf('/myPERF/monthlyPERF/') != -1 ||
    window.location.href.indexOf('/teamPERF/teamPERFList/') != -1 || window.location.href.indexOf('/teamPERF/teamRanking/') != -1) {
    //引入埋点文件
    if (!document.getElementsByClassName('mdScript').length) {
        var k = document.createElement("script");
        k.src = min ? mdDomain + "/htmd/min/baseMd.min.js" : mdDomain + "/htmd/js/baseMd.js";
        k.id = 'htmdScript';
        k.className = 'mdScript';
        var m = document.getElementsByTagName("body")[0];
        m.appendChild(k);

        k.onload = k.onreadystatechange = function () {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {

                //理顾宝H5需要的除底层文件中写的其他参数
                var pcParam = {
                    cn: '' //理顾工号
                }
                axiosHttp.http({
                    name: '获取理顾工号',
                    method: 'post',
                    url: apiUrl.queryEmpNo,
                    needFailCallback: true,

                }, (res) => {
                    pcParam.cn = res.data.data && res.data.data.empCode ? res.data.data.empCode : '';
                    // pcParam.orgHeightType = res.data.data && res.data.data.orgHeightType ? res.data.data.orgHeightType : '';
                    //调用埋点底层方法
                    var mdObj = {
                        //pf参数，表示当前项目，必传
                        pf: 2,
                        //pc/app/wap，必传
                        type: 'app',
                        //页面路径对应id配置，用于页面进入离开的埋点请求，必传
                        mdPathList: mdPathList,

                        //当前环境变量，不传时默认为window.env
                        envMd: window.env,
                        //点击事件的id配置，用于点击事件时的埋点请求，如无点击埋点需求时，可不传
                        //不传的话，不会监听点击事件的埋点
                        mdClickList: mdClickList,
                        //页面进入/离开/点击埋点时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里，如没有可不传
                        //不传的话，evt里参数info永远为''
                        // mdInfo: mdInfo, 
                        //除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
                        otherParams: pcParam,
                        //如果有nginx配置的默认首页，需要把首页和真正的路径的对应传过去，如没有可不传
                        // indexPathList: indexPathList 
                    }
                    window._htmd(mdObj);

                }, res => {
                    //调用埋点底层方法
                    var mdObj = {
                        pf: 2, //pf参数，表示当前项目
                        type: 'app', //pc/app/wap
                        envMd: window.env, //当前环境变量
                        mdPathList: mdPathList, //页面路径对应id配置，用于页面进入离开的埋点请求
                        otherParams: pcParam, //除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去
                    }
                    window._htmd(mdObj);

                })

            }
            k.onload = k.onreadystatechange = null;
        }
    }
}
