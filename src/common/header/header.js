//zepto的基本模块已经在webpack中引入
//这里只引入callback和deferred、selector模块，动画fx模块因使用率较少，在使用的文件里引入
//require('../vendor/zepto/zepto.min.js'); 
require('@common/vendor/zepto/callback.js');
require('@common/vendor/zepto/deferred.js');
require('@common/vendor/zepto/selector.js');
require('@common/js/splitUrl.js');
//弹层
require('@common/components/otherComponents/elasticLayer/typeOne/elasticLayer.js');
require('@common/components/otherComponents/elasticLayer/typeTwo/elasticLayerTypeTwo.js');

window.splitUrl = require('../../../common//js/splitUrl.js');

//iphoneX适配
(function(){
    function isIphoneX() {
        return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }

    if (isIphoneX()) {
        $('html').css('max-height', document.body.clientHeight );
        $('body').css('min-height', document.body.clientHeight );
    } 
})();


//750UI图适配
(function(doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
        dpr = 1,
        scale = 1 / dpr,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        // 乘以100，px : rem = 100 : 1
        docEl.style.fontSize = 40 * (width / 750) + 'px';
    };
    recalc()
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);