//无限循环轮播
function loopScroll(opt) {
    var defaultOpt = {
        "ele": "",
        "showPicNum": "4", //每个轮播单元里显示的图片数量
        "fineTuning":"10", //轮播元素之间的间距
        "autoTime":4000,   //自动播放时间间隔
        "aniTime":500  //动画时间
    };
    $.extend(this, defaultOpt, opt);
    this.$ele = $("#" + this.ele);
    this.$ul = this.$ele.find(".slide-list");
    this.$li = this.$ul.children();
    this.$prev = this.$ele.find(".prev");
    this.$next = this.$ele.find(".next");
    this.width = 0;
    this.distance = 0;
    this.len = 0;
};
loopScroll.prototype = {
    initialize: function () {
        var self = this;

        self.obtainWidth();
        $(window).on("resize", $.proxy(this.obtainWidth, this));

        if(self.setOnly()) {
             this.$prev.hide();
             this.$next.hide();
             self.$ul.css('left', -self.fineTuning);
             return
        };


        self.copy();
        self.prev();
        self.next();
    },
    setOnly: function(){
        var flag = false;
        this.$li.length > this.showPicNum ? flag = false : flag = true;
        return flag;
    },
    copy: function () {
        var self = this;

        self.$ul.append(self.$ul.html()).css({ 'left': -self.len * self.width / 2-self.fineTuning});
        self.$ul.children().eq(self.len / 2).addClass("tag");
    },
    obtainWidth: function () {
        var self = this;
        self.width = self.$li.width();
        self.len = self.$li.length * 2;
        self.$ul.css({ 'width': self.len * self.width });

        if (self.$ul.find(".tag").length) {
            self.$ul.css({ 'left': -self.$ul.find(".tag").position().left-self.fineTuning});
        }

    },
    prev: function () {
        var self = this;
        self.$prev.on("click", function () {
            self.distance = parseInt(self.$ul.css("left")) + self.width;
            self.showPics(self.distance);

        });
    },
    next: function () {
        var self = this;
        self.$next.on("click", function () {
            self.distance = parseInt(self.$ul.css("left")) - self.width;
            self.showPics(self.distance);
        });
    },
    showPics: function (distance, callback) {
        var self = this;
        if (self.$ul.is(":animated")) {
            return;
        }
        self.$ul.animate({ "left": distance }, self.aniTime, function () {
            var index;

            if (distance >= -self.fineTuning) {
                self.$ul.css("left", -self.len * self.width / 2 -self.fineTuning);
                console.log('123');
            } else if (distance <= (self.showPicNum - self.len) * self.width) {
                self.$ul.css('left', (self.showPicNum - self.len / 2) * self.width - self.fineTuning);
            };

            index = Math.abs(parseInt(parseInt(self.$ul.css("left"))/self.width));

            self.$ul.children().eq(index).addClass("tag").siblings().removeClass("tag");

            if(self.$ele.find("#num_box").length){
                    var numIndex = self.$ele.find(".tag").index()- self.len / 2;

                    self.$ele.find("#num_box").find("span").eq(numIndex).addClass("on").siblings().removeClass("on");
            }
            callback && callback()
        });

    },
    num: function(){
        var self=this;
        var $numBox = self.$ele.find("#num_box");
        var btn="";

        if(self.setOnly()) {
             return
        };

        for(var i=0; i < self.len / 2; i++) {
            btn += "<span></span>";
        }
        $numBox.append(btn).find("span").on("click",function(){
             self.distance = -parseInt(($(this).index()+self.len / 2)*self.width);
             self.showPics(self.distance);
        }).eq(0).trigger("click");
    },
    autoPlay: function(){
        var picTimer;
        var self=this;
        self.$ele.on("mouseover",function() {
            clearInterval(picTimer);
        }).on("mouseout",function() {
            picTimer = setInterval(function() {
                self.$next.trigger("click");
            },self.autoTime); //此4000代表自动播放的间隔，单位：毫秒
        }).trigger("mouseout");

    }

};
//自动创建轮播
var swiperArea = (function(){

     var el = '.block--swiper';

     var swiperArray = [];
     // 创建文档碎片
     var oFragmeng = document.createDocumentFragment();

     if(!$(el).length) return;
     // 遍历相关元素修改结构
     $(oFragmeng).append($(el).clone());

     $(oFragmeng).find(el).each(function(i){

             var mySwiper;

             $(this).attr('id', 'swiper_area_' + i)
                    .children().wrapAll('<div class="slide-scroll-mod"><div class="slide-box"><div class="slide-list clearfix"></div></div></div>')
                    .end().children()
                    .append('<div class="num-box" id="num_box"></div><a href="javascript:;" class="next"><svg viewbox="0 0 15 48" width="25" height="80" class="svg-arrow-next"><use xlink:href="../content/img/icon.svg#svg-arrow-next"></use></svg></a><a href="javascript:;" class="prev"><svg viewbox="0 0 15 48" width="25" height="80" class="svg-arrow-prev"><use xlink:href="../content/img/icon.svg#svg-arrow-prev"></use></svg></a>')
                    .end().replaceAll($(el).eq(i));



             mySwiper = new loopScroll({
                 "ele": 'swiper_area_' + i,
                 "showPicNum": "1",
                 "fineTuning":"0"
             });
             mySwiper.initialize();
             mySwiper.num();
             mySwiper.autoPlay();

             swiperArray.push(mySwiper);

     });

     return swiperArray

})();
