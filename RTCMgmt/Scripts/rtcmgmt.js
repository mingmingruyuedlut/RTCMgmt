/******Common Functions******/

//Trim the head and tail spaces of the current string( Trim )
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//Trim the head spaces of the current string( Left Trim )
String.prototype.LTrim = function () {
    return this.replace(/^\s*/g, "");
}

//Trim the tail spaces of the current string( Right Trim )
String.prototype.RTrim = function () {
    return this.replace(/\s*$/g, "");
}

//Judge current string contains substring or not
String.prototype.Contains = function (subStr) {
    var currentIndex = this.indexOf(subStr);
    if (currentIndex != -1) {
        return true;
    }
    else {
        return false;
    }
}

String.prototype.htmlEncode = function () {
    return $('<div/>').text(this).html();
}


String.prototype.htmlDecode = function () {
    return $('<div/>').html(this).text();
}

String.prototype.yyyymmddToDate = function () {
    var year = this.substr(0, 4);
    var month = this.substr(4, 2) - 1;
    var day = this.substr(6, 2);
    return new Date(year, month, day);
}

Date.prototype.yyyymmdd = function (seperateChar) {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + seperateChar + (mm[1] ? mm : "0" + mm[0]) + seperateChar + (dd[1] ? dd : "0" + dd[0]); // padding
};


// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    var money = symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    return money;
};


function initCommonDataTable(tableSelector) {
    var commonDataTable = $(tableSelector).dataTable();
}

function initCommonDataTableNoSorting(tableSelector) {
    var commonDataTable = $(tableSelector).dataTable({ "ordering": false });
}

function checkAgeFormat(age) {
    var vResult = true;
    var regex = /^[0-1]{0,1}[0-9]{0,2}$/;
    if (!regex.test(age)) {
        vResult = false;
    }
    return vResult;
}

function checkPhoneCodeFormat(phoneCode) {
    var vResult = true;
    var regex = /^[1-9][0-9]{5}$/;
    if (!regex.test(phoneCode)) {
        vResult = false;
    }
    return vResult;
}

function checkEmailFormart(email) {
    var vResult = true;
    var regex = /\w@\w*\.\w/;
    if (!regex.test(email)) {
        vResult = false;
    }
    return vResult;
}

function checkPhoneFormat(phone) {
    var vResult = true;
    var regex = /^[1-9][0-9]{10}$/;
    if (!regex.test(phone)) {
        vResult = false;
    }
    return vResult;
}

function checkFaxFormat(fax) {
    var vResult = true;
    var regex = /^(\d{3,4}-)?\d{7,8}$/;
    if (!regex.test(fax)) {
        vResult = false;
    }
    return vResult;
}

function IsNumber(obj) {
    if (obj != null && obj != '') {
        return !isNaN(obj);
    }
    return false;
}

function IsyyyyMMddStrFormat(obj) {
    var vResult = true;
    if (obj.length != 8 || isNaN(obj)) {
        vResult = false;
    }
    else {
        var year = +(obj.substr(0, 4));
        var month = +(obj.substr(4, 2));
        var day = +(obj.substr(6, 2));
        if (year < 2016 || month > 12 || day > 31 || new Date(year, month - 1, day) == 'Invalid Date') {
            vResult = false;
        }
    }
    return vResult;
}


/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/

function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}



/******Common Functions******/
