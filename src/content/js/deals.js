/**
 * Created by Dongyinan on 2016/2/3.
 */
//到计时

var countdown = {
    initialize: function() {
        this.sysSecond = parseInt(1800000);//获取起始时间
        this.interValObj = "";
        this.barcode = "";
        this.initEvent()
    },
    initEvent: function(){
        this.interValObj = window.setInterval($.proxy(this.setRemainTime, this), 1000);
    },
    setRemainTime:function(){
            var self = this;
            if (self.sysSecond > 0) {
                self.sysSecond = self.sysSecond - 1;
                var second = self.appendzero(Math.floor(self.sysSecond % 60));
                var minite = self.appendzero(Math.floor((self.sysSecond / 60) % 60));
                var hour = self.appendzero(Math.floor((self.sysSecond / 3600) % 24));
                var day = self.appendzero(Math.floor((self.sysSecond / 3600) / 24));
                $(".countdown-days","#count_down").html(day);
                $(".countdown-hours","#count_down").html(hour);
                $(".countdown-minutes","#count_down").html(minite);
                $(".countdown-secounds","#count_down").html(second);
            } else {
                window.clearInterval(self.interValObj);
                //倒计时结束后执行事件
            }
    },
    appendzero:function(obj) {
         if (obj < 10) return "0" + obj; else return obj;
    }
}




$(function(){
    countdown.initialize();
});
