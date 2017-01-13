/**
 * Created by liuqiuyue on 2017/1/12.
 */

$(function() {
    var cal=new Calculator('#showWindow','#container');
    var cal1=new Calculator('#showWindow1','#container1');
});
//构造函数--计算器
//sw显示数据窗口；cn计算器主体
function Calculator(sw,cn) {
    var _this=this;
    this.yunSuan = 0;
// 运算符号
    this.change = 0;
// 属于运算符后需要清空上一数值
    this.num1 = 0.0;
// 运算第一个数据
    this.num2 = 0.0;
// 运算第二个数据
    this.flag = 0;
//记忆数据
    this.dspSize = 80;
//显示窗口文字大小
    this.showW=$(sw);
//显示窗口
    this.calD= $(cn);
//计算器主体
    $(cn+"  .number").click(function(){
        _this.numMon(this);
    });
    $(cn+"  .clear").click(function(){
        _this.init();
    });
    $(cn+"  .backspace").click(function(){_this.backMon()});
    $(cn+"  .operator").click(function(){_this.operMon(this)});
    $(cn+"  .equal").click(function(){_this.equalMon()});
    $(sw).attr("tabindex",0);//jquery 实现div、span的keydown事件
    $(sw).keydown(function () {
        _this.keyMon(event,cn);
    })
}
// 按键监听
Calculator.prototype.keyMon=function(event,cn) {
    // 数字监听
    if (((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 95 && event.keyCode < 106) || (event.keyCode == 190 || event.keyCode == 110)) && !event.shiftKey) {
        this.keyDownNum(event.keyCode);
    }
    // "+"监听
    if ((event.keyCode == 187 && event.shiftKey) || event.keyCode == 107) {
        this.keyDownYunSuan("＋");
    }
    // "-"监听
    if ((event.keyCode == 189 && event.shiftKey) || event.keyCode == 109) {
        this.keyDownYunSuan("－");
    }
    // "*"监听
    if ((event.keyCode == 56 && event.shiftKey) || event.keyCode == 106) {
        this.keyDownYunSuan("×");
    }
    // "÷"监听
    if (event.keyCode == 191 || event.keyCode == 111) {
        this.keyDownYunSuan("÷");
    }
    // "="监听
    if ((event.keyCode == 187 && !event.shiftKey) || event.keyCode == 13) {
        $(cn+"  .equal").click();
    }
    // "回退"监听
    if (event.keyCode == 8) {
        $(cn+"  .backspace").click();
        return false;
    }
    // "清屏"监听
    if (event.keyCode == 27 || event.keyCode == 46 || (event.keyCode == 110 && event.shiftKey)) {
        $(cn+"  .clear").click();
        return false;
    }
}
Calculator.prototype.numMon=function (n) {
    var text=$(n).text();
    var newValue = this.Judeg(text,this.showW.html(),this.change)[0];
    this.change =this.Judeg(text,this.showW.html(),this.change)[1];
    this.showW.html(newValue);
    this.textSmall();
}
Calculator.prototype.backMon=function () {

        if (this.change == 1) {
            this.yunSuan = 0;
            this.change = 0;
        }
        var value = this.showW.html();
        if (value.length == 1) {
            this.showW.html("0");
        } else {
            value = value.substr(0, value.length - 1);
            this.showW.html(value);
            this.txtDiag();
        }

}
Calculator.prototype.operMon=function (n) {
    var value = this.showW.html();
    this.flag = this.yunSuan;
    value = this.pointIden(value);
    this.num2 = parseFloat(value);
    this.showW.html(this.operation(this.flag));
    this.change = 1;
    //
    // this.yunSuan = $(n).attr('id');
    this.yunSuan = $(n).text();
    var value = this.showW.html();
    this.txtDiag();
    value = this.pointIden(value);
    this.num1 = parseFloat(value);
}
Calculator.prototype.equalMon=function () {
    var value =this.showW.html();
    value = this.pointIden(value);
    this. num2 = parseFloat(value);
    this.showW.html(this.operation(this.yunSuan)).css("fontSize", this.dspSize + "px");
    this.txtDiag();
    this.change = 1;
    this.yunSuan = 0;
    this.num1 = 0;
    this.num2 = 0;
}
/**
 * 按键触发运算符
 */
Calculator.prototype.keyDownYunSuan=function (oprChar) {
    var value =this.showW.html();
    this.flag = this.yunSuan;
    value = this.pointIden(value);
    this.num2 = parseFloat(value);
    this.showW.html(this.operation(this.flag));
    this.change = 1;
    this.yunSuan = oprChar;
    //将num1和num2计算出来的结果，保存到num1中，并在屏幕显示
    var value = this.showW.html();
    this.txtDiag();
    value = this.pointIden(value);
    this.num1 = parseFloat(value);
}
/**
 * 按键触发数字 code ASCLL码
 */
Calculator.prototype.keyDownNum=function (code) {
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
        number = ".";
    }
    var newValue = this.Judeg(number,this.showW.html(),this.change)[0];
    this.change =this.Judeg(number,this.showW.html(),this.change)[1];
    this.showW.html(newValue);
    this.textSmall();
}
//0、.运算判断
//输入或者按下的数字n，当前显示框显示的数据oV,当前的运算符ch
//返回应显示的数据
Calculator.prototype.Judeg=function (n, oV, ch) {
    if (ch == 1) {
        oV = "0";
        ch = 0;
        this.showW.css("fontSize", this.dspSize + "px");
    }
    var newValue = "";
    if (n == ".") {
        if (oV.indexOf('.') == -1)
            newValue = oV + ".";
        else
            newValue = oV;
    } else {
        if (oV == 0 && oV.indexOf('.') == -1) {
            newValue = n;
        } else {
            newValue = oV + n;
        }
    }
    return [newValue,ch];
}
Calculator.prototype.operation=function(yunSuan) {
    var sum = 0;
    if (yunSuan == "＋") {
        sum = this.num1 + this.num2;
    } else if (yunSuan == "－") {
        sum = this.num1 - this.num2;
    } else if (yunSuan == "×") {
        sum = this.num1 * this.num2;
    } else if (yunSuan == "÷") {
        sum = this.num1 / this.num2;
    } else if (yunSuan == 0 || this.num1 == 0 || this.num2 == 0) {
        sum = this.num1 + this.num2;
    }
    var re = /^[0-9]+.?[0-9]*$/;
    if (re.test(sum)) {
        sum = sum.toFixed(2);
    }
    return sum;
}
Calculator.prototype.pointIden=function (value) {
    var pointIndex = value.indexOf(".");
    if (pointIndex == value.length) {
        value = value.substr(0, value.length - 1);
    }
    return value;
}
//添加遮罩层
Calculator.prototype.showMask=function () {
    var oMask = $('<div class="mask"></div>');
    var topD=this.calD.offsetTop  ;
    oMask.css({
        "position": "absolute", "filter": "alpha(opacity=60)", "background-color": "#b1b1b1",
        "z-index": "1002",
        "opacity":"0.5",
        "top": 15+"px",
        "left": "5px",
    })
    oMask.css("height", this.calD.height());
    oMask.css("width", this.calD.width());
    oMask.appendTo(this.calD);
    var btn = $('<input type="button" value="超出精度，点我重新计算" class="btn">');
    btn.appendTo(oMask);
    btn.click(function() {
        oMask.remove();
    });
}
Calculator.prototype.textSmall=function () {
    //将文字变小显示
    var _this=this;
    this.showW.map(function() {
        //js属性
        if (this.offsetWidth < this.scrollWidth) {
            var oFS = $(this).css("fontSize");
            var textFontSize = parseFloat(oFS, 10);
            var unit = oFS.slice(-2);
            textFontSize -= 7;
            if (textFontSize > 40) {
                $(this).css("fontSize", textFontSize + unit);
            } else {
                _this.showMask();
                _this.init();
                return;
            }
        }
    });
};
//显示框文字是否溢出检测
Calculator.prototype.txtDiag=function () {
    this.showW.map(function() {
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
Calculator.prototype.init=function () {
    this.showW.html("0").css("fontSize", this.dspSize + "px");
    this.yunSuan = 0;
    this.change = 0;
    this.num1 = 0.0;
    this.num2 = 0.0;
    this.flag = 0;
}
