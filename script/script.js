var yunSuan = 0;
// 运算符号，0-无运算;1-加法;2-减法;3-乘法;4-除法
var change = 0;
// 属于运算符后需要清空上一数值
var num1 = 0.0;
// 运算第一个数据
var num2 = 0.0;
// 运算第二个数据
var flag = 0;
//记忆数据
var dspSize = 80;
//显示窗口文字大小
$(function() {
    // 点击数字触发事件
    $(".number").click(function() {
        var newValue = Judeg($(this).attr('id'), $("#showWindow").html(), change);
        $("#showWindow").html(newValue);
        textSmall();
    });
    // 点击清屏触发事件
    $("#clear").click(function() {
        init();
    });
    // 点击退格触发事件
    $("#backspace").click(function() {
        if (change == 1) {
            yunSuan = 0;
            change = 0;
        }
        var value = $("#showWindow").html();
        if (value.length == 1) {
            $("#showWindow").html("0");
        } else {
            value = value.substr(0, value.length - 1);
            $("#showWindow").html(value);
            txtDiag();
        }
    });
    // 点击运算符号触发事件
    $(".operator").click(function() {
        var value = $("#showWindow").html();
        flag = yunSuan;
        value = pointIden(value);
        num2 = parseFloat(value);
        $("#showWindow").html(operation(flag));
        change = 1;
        yunSuan = $(this).attr('id');
        var value = $("#showWindow").html();
        txtDiag();
        value = pointIden(value);
        num1 = parseFloat(value);
    });
    // 点击等于符号触发事件
    $("#equal").click(function() {
        var value = $("#showWindow").html();
        value = pointIden(value);
        num2 = parseFloat(value);
        $("#showWindow").html(operation(yunSuan)).css("fontSize", dspSize + "px");
        txtDiag();
        change = 1;
        yunSuan = 0;
        num1 = 0;
        num2 = 0;
    });
});
// 按键监听
$(document).keydown(function(event) {
    // 数字监听
    if (((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode == 190 || event.keyCode == 110)) && !event.shiftKey) {
        keyDownNum(event.keyCode);
    }
    // "+"监听
    if ((event.keyCode == 187 && event.shiftKey) || event.keyCode == 107) {
        keyDownYunSuan("plus");
    }
    // "-"监听
    if ((event.keyCode == 189 && event.shiftKey) || event.keyCode == 109) {
        keyDownYunSuan("minus");
    }
    // "*"监听
    if ((event.keyCode == 56 && event.shiftKey) || event.keyCode == 106) {
        keyDownYunSuan("multiply");
    }
    // "/"监听
    if (event.keyCode == 191 || event.keyCode == 111) {
        keyDownYunSuan("divide");
    }
    // "="监听
    if ((event.keyCode == 187 && !event.shiftKey) || event.keyCode == 13) {
        $("#equal").click();
    }
    // "回退"监听
    if (event.keyCode == 8) {
        $("#backspace").click();
        return false;
    }
    // "清屏"监听
    if (event.keyCode == 27 || event.keyCode == 46 || (event.keyCode == 110 && event.shiftKey)) {
        $("#clear").click();
        return false;
    }
});
/**
 * 按键触发运算符
 */
function keyDownYunSuan(oprChar) {
    var value = $("#showWindow").html();
    flag = yunSuan;
    value = pointIden(value);
    num2 = parseFloat(value);
    $("#showWindow").html(operation(flag));
    change = 1;
    yunSuan = oprChar;
    //将num1和num2计算出来的结果，保存到num1中，并在屏幕显示
    var value = $("#showWindow").html();
    txtDiag();
    value = pointIden(value);
    num1 = parseFloat(value);
}
/**
 * 按键触发数字 code ASCLL码
 */
function keyDownNum(code) {
    var number = 0;
    if (code == 48 || code == 96) {
        // "0"监听
        number = 0;
    }
    if (code == 49 || code == 97) {
        // "1"监听
        number = 1;
    }
    if (code == 50 || code == 98) {
        // "2"监听
        number = 2;
    }
    if (code == 51 || code == 99) {
        // "3"监听
        number = 3;
    }
    if (code == 52 || code == 100) {
        // "4"监听
        number = 4;
    }
    if (code == 53 || code == 101) {
        // "5"监听
        number = 5;
    }
    if (code == 54 || code == 102) {
        // "6"监听
        number = 6;
    }
    if (code == 55 || code == 103) {
        // "7"监听
        number = 7;
    }
    if (code == 56 || code == 104) {
        // "8"监听
        number = 8;
    }
    if (code == 57 || code == 105) {
        // "9"监听
        number = 9;
    }
    if (code == 190 || code == 110) {
        // "."监听
        number = "point";
    }
    var newValue = Judeg(number, $("#showWindow").html(), change);
    $("#showWindow").html(newValue);
    textSmall();
}
//0、.运算判断
//输入或者按下的数字n，当前显示框显示的数据oV,当前的运算符ch
//返回应显示的数据
function Judeg(n, oV, ch) {
    var num = n;
    var oldValue = oV;
    if (change == 1) {
        oldValue = "0";
        change = 0;
        $("#showWindow").css("fontSize", dspSize + "px");
    }
    var newValue = "";
    if (num == "point") {
        if (oldValue.indexOf('.') == -1)
            newValue = oldValue + ".";
        else
            newValue = oldValue;
    } else {
        if (oldValue == 0 && oldValue.indexOf('.') == -1) {
            newValue = num;
        } else {
            newValue = oldValue + num;
        }
    }
    return newValue;
}
function operation(yunSuan) {
    var sum = 0.0;
    if (yunSuan == "plus") {
        sum = num1 + num2;
    } else if (yunSuan == "minus") {
        sum = num1 - num2;
    } else if (yunSuan == "multiply") {
        sum = num1 * num2;
    } else if (yunSuan == "divide") {
        sum = num1 / num2;
    } else if (yunSuan == 0 || num1 == 0 || num2 == 0) {
        sum = num1 + num2;
    }
    var re = /^[0-9]+.?[0-9]*$/;
    if (re.test(sum)) {
        sum = sum.toFixed(2);
    }
    return sum;
}
function pointIden(value) {
    var pointIndex = value.indexOf(".");
    if (pointIndex == value.length) {
        value = value.substr(0, value.length - 1);
    }
    return value;
}
//添加遮罩层
function showMask() {
    var oMask = $('<div id="mask" class="mask"></div>');
    oMask.css("height", $("#container").height());
    oMask.css("width", $("#container").width());
    oMask.appendTo(document.body);
    var btn = $('<input type="button" value="重新算" class="btn">');
    btn.appendTo(oMask);
    btn.click(function() {
        oMask.remove();
    });
    $("#showWindow").html("0").css("fontSize", dspSize + "px");
}
function textSmall() {
    //将文字变小显示
    $("#showWindow").map(function() {
        //js属性
        if (this.offsetWidth < this.scrollWidth) {
            var oFS = $(this).css("fontSize");
            //parseFloat的第二个参数表示转化的进制，10就表示转为10进制
            var textFontSize = parseFloat(oFS, 10);
            //javascript自带方法
            var unit = oFS.slice(-2);
            //获取单位
            textFontSize -= 7;
            if (textFontSize > 40) {
                $(this).css("fontSize", textFontSize + unit);
            } else {
                showMask();
                init();
                return;
            }
        }
    });
}
;//显示框文字是否溢出检测
function txtDiag() {
    $("#showWindow").map(function() {
        while (this.offsetWidth < this.scrollWidth) {
            var oF = $(this).css("fontSize");
            //parseFloat的第二个参数表示转化的进制，10就表示转为10进制
            var textFontSize = parseFloat(oF, 10);
            //javascript自带方法
            var unit = oF.slice(-2);
            //获取单位
            textFontSize -= 7;
            $(this).css("fontSize", textFontSize + unit);
        }
    });
}
//初始化
function init() {
    $("#showWindow").html("0").css("fontSize", dspSize + "px");
    yunSuan = 0;
    change = 0;
    num1 = 0.0;
    num2 = 0.0;
    flag = 0;
}
