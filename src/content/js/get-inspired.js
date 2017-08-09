/**
 * Created by orlando on 2015/5/26.
 */

function switchPic(opt) {
    var defaultOpt = {
        ele      : "",                //轮播DOM
        time     : 4000,              //自动播放的时间
        playType : "default",         //播放类型["default","fadeIn"]
        playState: "default",         //播放状态["default","lazier"]
        callback : function () {
        }     //回调事件
    }
    $.extend(this, defaultOpt, opt);
    this.flag = false;        //防止连续点击
    this.current = 0;        //轮播页数
    this.tabCon = $("#" + this.ele).find(".tab-con");
    this.tabNum = $("#" + this.ele).find(".tab-num");
    this.len = this.tabCon.children("li").length; //切换图片数量

}


//图片轮播切换过程
switchPic.prototype.scrollPic = function (currentHistory, current, direction) {
    var self = this,
        $li = self.tabCon.children("li");



        if (self.playType == "fadeIn") {
            $li.eq(currentHistory).css({"z-index": "4"})
                .animate({"opacity": "0"}, 1500, function () {
                    $(this).css({"opacity": "", "z-index": ""});
                })
                .end()
                .eq(current).addClass("on").siblings().removeClass("on");

        } else {

            var $l, $r;
            (direction == "l") ? $l = -100 : $l = 100;
            $r = -$l;

            $li.removeClass()
                .eq(currentHistory).addClass("slide_out_l").css({"left": "0"})
                .animate({"left": ($l + "%")}, 1400, "linear", false)
                .end()
                .eq(current).addClass("on").css({"left": ($r + "%")})
                .animate({"left": "0"}, 1000, "linear", false);

        }
    ;
    self.tabNum.find("li").removeClass()
        .eq(current).addClass("current");

};
//自动播放
switchPic.prototype.autoPlay = function () {
    var picTimer,
        self = this,
        currentHistory = 0,
        $ele = $("#" + self.ele);

    $ele.on("mouseover", function () {
        clearInterval(picTimer);
    }).on("mouseleave", function () {
        picTimer = setInterval(function () {
            self.current = self.tabCon.find(".on").index();
            currentHistory = self.current;
            self.current++;
            if (self.current == self.len) {
                self.current = 0;
            }
            ;
            self.scrollPic(currentHistory, self.current, "l");
        }, self.time);
    });

    if (self.playState == "lazier") {
        var finished = true;

        function scrollSee() {
            var $winScrollT = $(window).scrollTop(),
                $winH = $(window).height(),
                $eleOffsetT = $ele.offset().top,
                $eleH = $ele.outerHeight(),
                $eleSum = $eleOffsetT + $eleH,
                $winSum = $winScrollT + $winH;
            if (($winScrollT > $eleSum) || ($winSum < $eleOffsetT)) {
                finished = true;
                clearInterval(picTimer);
                return;
            }
            ;
            if (finished) {
                finished = false;
                $ele.trigger("mouseleave");
            }
            ;

        };
        scrollSee();
        $(window).on("scroll", function () {
            scrollSee();
        });
    } else {
        $ele.trigger("mouseleave");
    }
    ;


};
//切换小圆点
switchPic.prototype.num = function () {
    var self = this,
        btn = "";
    for (var i = 0; i < self.len; i++) {
        btn += "<li><a href='javascript:;' title=''></a></li>";
    }
    ;
    self.tabNum.append(btn).find("a").on("click", function () {
        var currentHistory = self.tabCon.find(".on").index(),
            $li = $(this).parent();
        self.current = $li.index();

        //阻止连续点击
        if (self.flag == true || $li.hasClass("current")) {
            return;
        }
        ;
        if (currentHistory > self.current) {
            self.scrollPic(currentHistory, self.current, "r");
        } else {
            self.scrollPic(currentHistory, self.current, "l");
        }

        //设置开关阻止连续点击
        self.flag = true;
        setTimeout(function () {
            self.flag = false;
        }, 1100);
    });
    self.tabNum.find("li").eq(0).addClass("current");
};

//轮播类型点击切换
switchPic.prototype.tabSwich = function () {
    var self = this;
    self.tabTit.on("click", "a", function () {
        var $selfB = $(this);
        //阻止连续点击
        if (self.flag == true || $selfB.hasClass("on")) {
            return;
        }
        ;
        //标题切换计算
        $selfB.addClass("on").siblings().removeClass("on");
        self.tabLinkCalculate();
        //当前图片，前一图片索引
        var currentHistory = self.current;
        self.current = $selfB.index();
        //图片切换
        if (currentHistory > self.current) {
            self.scrollPic(currentHistory, self.current, "r");
        } else {
            self.scrollPic(currentHistory, self.current, "l");
        }
        ;
        //设置开关阻止连续点击
        self.flag = true;
        setTimeout(function () {
            self.callback && self.callback(self.current);
            self.flag = false;
        }, 1200);
    });
};




//模块左轮播
function galleryA() {
    var galleryA = new switchPic({
        ele      : "gi_gallery_left",
        playType : "fadeIn",
        playState: "lazier",
        time     : 5000
    });
    galleryA.autoPlay();
}
;
//模块右轮播
function galleryB() {
    var galleryB = new switchPic({
        ele      : "gi_gallery_right",
        playState: "lazier",
        time     : 4000
    });
    galleryB.num();
    galleryB.autoPlay();
}
;

var giTopSearch = {
    initialize:function(){
        this.$ele=$("#gi_search_top");
        this.$input=this.$ele.find(".search-input");
        this.$list=this.$ele.find(".seach-list");
        this.initEvent();
    },
    initEvent:function(){
        this.$input.on("focus",$.proxy(this.focus, this));
        this.$input.on("blur",$.proxy(this.blur, this));
        this.$input.on("input propertychange",$.proxy(this.input, this));
        this.$list.on("click","a",$.proxy(this.click, this))
    },
    focus:function(e){
        $(e.currentTarget).addClass("on");
    },
    blur:function(e){
        var self=this;
        setTimeout(function(){
            $(e.currentTarget).removeClass("on");
            self.$list.hide();
        },150);
    },
    input:function(e){
        var self = this,
            $val = $(e.currentTarget).val();
        if($val.length){
            self.$list.show();
        }else {
            self.$list.hide();
        }
    },
    click:function(e){
        var self = this,
            $text = $(e.currentTarget).text();
        self.$input.val($text);
    }
};



$(function () {
    galleryA();
    galleryB();
    giTopSearch.initialize();
});
