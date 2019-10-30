import moment from 'moment';
import _axiosHttp from "../ajax/axiosHttp";
import tipAction from "../../components/otherComponents/tipAction/tipAction";


var getVarType = {

    //1. 对象
    isObjEmpty: function(data) {
        for (var i in data) {
            return 'obj'; //如果不为空，则会执行到这一步，返回false
        }
    },

    //2. 函数
    isFunction: function(data) {
        //原生写法
        if (Object.prototype.toString.call(data) === "[object Function]") {
            //是函数，表示
            return 'function';
        }
    },

    //3. 数组
    isArray: function(data) {
        //原生写法
        if (Object.prototype.toString.call(data) === '[object Array]') {
            //是函数，表示
            return 'array';
        }
    },

    //4. 字符串
    isString: function(data) {
        //原生写法
        if (Object.prototype.toString.call(data) === '[object String]') {
            //是函数，表示
            return 'string';
        }
    }
};

function objDeepCopy(data) {
    var dataCopy = getVarType.isArray(data) == 'array' ? [] : {};
    for (var item in data) {
        dataCopy[item] = (typeof data[item] === 'object' && data[item] != null) ? objDeepCopy(data[item]) : data[item];
    }
    return dataCopy;
}


var utils = {
    //格式化时间
    momentFmtYmdhs: function(str) {
        if (str) return moment(str).format("YYYY-MM-DD HH:mm:ss");
        return "--";
    },
    momentFmtYmdh: function(str) {
        if (str) return moment(str).format("YYYY-MM-DD HH:mm");
        return "--";
    },
    momentFmtYmd: function(str) {
        if (str) return moment(str).format("L");
        return "--";
    },
    momentFmtYmd2: function(str) {
        if (str) return moment(str).format("YYYY-MM-DD");
        return "--";
    },
    //深拷贝对象
    objDeepCopy: objDeepCopy,

    //替换null
    replaceNull: function(str) {
        if (str == null) {
            return "";
        } else {
            return str;
        }
    },
    //校验联系方式为手机号或者座机号 例如：0316-2312222   13011221212
    telNumberValid(tel, tip) {
        let RegExp3 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
        let RegExp4 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        if (RegExp3.test(tel) == false && RegExp4.test(tel) == false) {
            tipAction(tip);
            return false;
        } else {
            return true;
        }
    },
    //校验投资金额为 -- 限制输入12位非零开头的数字（限制输入整数，不输入小数）
    priceRulesValid(val, tip) {
        let RegExp1 = /^([1-9]\d{0,11})$/;
        if (RegExp1.test(val) == false) {
            tipAction(tip);
            return false;
        } else {
            return true;
        }
    },
    //校验表单元素
    formElValid(obj, obj1) {
        for (var key in obj) {

            if ((obj[key] == '' || obj[key] == undefined || obj[key] == null) && (obj[key] != 0)) {

                for (let key1 in obj1) {

                    if (key == key1) {

                        tipAction(obj1[key1]);
                        return false;
                    }
                }
            }
        }
        return true;
    },

    //校验表单元素(新，资产配置时添加，防止影响之前的需求，以后表单都采用此方法)
    newFormElValid(obj, obj1) {
        for (var key in obj) {
            if ((obj[key] == '' || obj[key] == undefined || obj[key] == null) && (obj[key] !== 0)) {
                for (let key1 in obj1) {
                    if (key == key1) {
                        tipAction(obj1[key1]);
                        return false;
                    }
                }
            }
        }
        return true;
    },

    //校验字符串是否为空
    checkIsEmpty(str ){
        if(  !!str && str != 0 ){
            return false;
        }
        return true;
    },

    //批量获取字典
    getDicData(arrDic, callback) {
        _axiosHttp.http({
            url: apiUrl.getDictionaryListByTypesApi,
            params: {
                types: arrDic
            }
        }, (res) => {
            callback(res.data.data || {});
        }, res => {})
    },
    //格式化字典值
    parseDic(value, dicData) {

        if (dicData == '' || dicData == null || dicData == undefined || value == -1) {
            return "--";
        } else {
            for (var i = 0; i < dicData.length; i++) {
                if (value == dicData[i].dicKey) {
                    return dicData[i].dicValue;
                } else if (value != dicData[i].dicKey && i == dicData.length - 1) {
                    return "--";
                }
            }
        }

    },
    //格式化字典值MUi
    parseDicArr(dicData) {
        var dicArr = [];
        for (var i = 0; i < dicData.length; i++) {
            dicArr.push({ value: dicData[i].dicKey, text: dicData[i].dicValue });
        }
        return dicArr;
    },
    //可传不同参数的格式化字典值方法
    parseDifDicArr(dicData, key, value) {
        key = !!key ?  key : 'dicKey';
        value = !!value ? value : 'dicValue';

        var dicArr = [];
        for (var i = 0; i < dicData.length; i++) {
            dicArr.push({value: dicData[i][key],text: dicData[i][value]});
        }
        return dicArr;
    },
    //只能输入整数
    NumberCheck(t){

        //判断t的格式，如果是数字，则变为字符串
        if( typeof t == 'number'){
            t = t + '';
        }
        t = t.replace(/\D/g,'');
        if (t.length > 1 && t.substring(0,1) == 0) {
            t = 0
        }
        return t
    },
    //数字转化
    //万-元
    toOne(num) {
        if (num) {
            var n = num * 10000;
            return n;
        } else {
            return num;
        }
    },
    //元-万
    toThousand(num) {
        if (num) {
            var n = num / 10000;
            return n;
        } else {
            return num;
        }

    },
    //给数字添加千分位的逗号
    comdify(n) {
        //n是传进来的需要添加千分位的数据，格式需要为字符串
        if (typeof n == 'number') {
            n = n + ''; //n如果为数字，转换成字符串
        }
        //添加千分位
        var re = /\d{1,3}(?=(\d{3})+$)/g;
        var n1 = n.replace(/^(\d+)((\.\d+)?)$/,
            function(s, s1, s2) {
                return s1.replace(re, "$&,") + s2;
            }
        );
        //返回处理过的字符串

        return n1;
    },
    /*
        整数数字转中文，小数不管用
        @number {Integer} 形如123的数字
        @return {String} 返回转换成的形如 一百二十三 的字符串             
    */
    integerToChinese(number) {
        var a = (number + '').split(''),
            s = [],
            units='个十百千万@#%亿^&~', // 单位
            chars= '零一二三四五六七八九', // 字符
            t = this;
        if (a.length > 12) {
            throw new Error('too big');
        } else {
            for (var i = 0, j = a.length - 1; i <= j; i++) {
                if (j == 1 || j == 5 || j == 9) { //两位数 处理特殊的 1*
                    if (i == 0) {
                        if (a[i] != '1') s.push(chars.charAt(a[i]));
                    } else {
                        s.push(chars.charAt(a[i]));
                    }
                } else {
                    s.push(chars.charAt(a[i]));
                }
                if (i != j) {
                    s.push(units.charAt(j - i));
                }
            }
        }
        //return s;
        return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) { //优先处理 零百 零千 等
            b = units.indexOf(d);
            if (b != -1) {
                if (d == '亿') return d;
                if (d == '万') return d;
                if (a[j - b] == '0') return '零'
            }
            return '';
        }).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
            return b;
        }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function(m) {
            return { '@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千' } [m];
        }).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
            c = units.indexOf(d);
            if (c != -1) {
                if (a[j - c] == '0') return d + '零' + b
            }
            return m;
        });
    },

    //得到26个大写英文字母，数组形式
    getWord(){
        var str = [];
        for(var i = 65; i<91; i++){
            str.push(String.fromCharCode(i));
        }
        return str;
    }
}
export default utils
