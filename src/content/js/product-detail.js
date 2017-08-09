/**
 * Created by Dongyinan on 2016/1/13.
 */
//画廊右侧线高度
var autoLine = {
    initialize:function(){
        this.$detail=$(".product-detail");
        this.$galleryH = $(".gallery").height();
        this.$detailH = this.$detail.height();
        this.initEvent();
    },
    initEvent:function(){
        this.lineHeight();
    },
    lineHeight:function(){
        var self = this,$h;
        self.$galleryH>=self.$detailH?$h=self.$galleryH:self.$galleryH="";
        self.$detail.css("height",$h);
    }
};
//购买按键弹层操作
var addTips = {
    initialize:function(){
        this.index=0;
        this.initEvent();
    },
    initEvent:function(){
        var self= this;
        $("#add_to_wishList").on("click",function(e){
            self.addTips(e,".wishList-tips");
        });
        $("#add_to_shoppingBag").on("click",function(e){
            self.addTips(e,".shoppingBag-tips")
        });
        $("#ship_link").on("click",function(e){
            self.addTips(e,".ship-tips")
        });
    },
    addTips:function(e,tips){
        var self= this;
        if($(e.currentTarget).hasClass("btn-disable")){
             return;
        };
        $(tips).css({"z-index":self.index++}).fadeIn();
        setTimeout(function(){
            $(tips).fadeOut();
        },4000);
    }
};

//画廊操作
var gallery = {
    initialize:function(opt){
        var defaultOpt = {
               "ele":"gallery_box"//主DOM
              ,"prevBtn":"#prev_btn"
              ,"nextBtn":"#next_btn"
              ,"zoomSwitch":true//是否开启放大镜
              ,"clickSwitch":true//是否开启点击小图切换大图
        };
        $.extend(this,defaultOpt,opt);
        this.$ele=$("#"+this.ele);
        this.$prevBtn = $(this.prevBtn);
        this.$nextBtn = $(this.nextBtn);
        this.$wrap=this.$ele.find(".pic-wrap");
        this.$list=this.$ele.find(".pic-list");
        this.$zoom=this.$ele.find(".zoom-wrap");
        this.$float=this.$ele.find(".float-box");
        this.$picMain = this.$wrap.children("img");
        this.$videoMain = this.$wrap.find(".video-main");
        this.$thumb=this.$list.children("div");
        this.$thumbBoxUl = this.$thumb.find("ul");
        this.$thumbBoxLi = this.$thumbBoxUl.find("li");
        this.$picCopy=this.$float.children("img");
        this.width = 0;
        this.distance = 0;
        this.len = 0;
        this.initEvent();
    },
    initEvent:function(){

        this.obtainWidth();//算总宽度
        this.addTag();
        $(window).on("resize",$.proxy(this.obtainWidth, this));//窗口变化算总宽度
        this.initializeScroll();//左右按钮初始化
        //左右切换
        this.$prevBtn.on("click",$.proxy(this.prevScroll, this));
        this.$nextBtn.on("click",$.proxy(this.nextScroll, this));

        if(this.clickSwitch){
            this.$thumb.on("click","a",$.proxy(this.switchClidk, this));//点击小图切换大图
            this.$thumb.find("li").eq(0).find("a").trigger("click");//第一张大图初始化
        }
        if(this.zoomSwitch) {
            //放大镜操作
            this.$wrap.on("mouseover", $.proxy(this.zoomMouseover, this))
                .on("mousemove", $.proxy(this.zoomMousemove, this))
                .on("mouseout", $.proxy(this.zoomMouseout, this));
        }
    },
    switchClidk:function(e){
        var self = this;
        var $videoHtml = '<iframe class="video-main" frameborder="0" allowfullscreen="" src=""></iframe>',
            $rel = $(e.currentTarget).data("rel"),
            $zoom = $(e.currentTarget).data("zoom"),
            $layerBtn = $("#viewlayer_btn"),
            $video = $(e.currentTarget).data("video");
        $(e.currentTarget).parent().addClass("active").siblings().removeClass("active");
        if($video == undefined || $video == "") {
            self.$wrap.removeClass("zoom-off");
            self.$picMain.show().attr({"src":$rel});
            self.$picCopy.attr({"src":$rel});
            self.$zoom.find("img").attr({"src":$zoom});
            $(".video-main","#gallery_wrap").remove();
            $layerBtn.show();
            return
        }
        $layerBtn.hide();
        if(!self.$videoMain.length){
            self.$wrap.append($videoHtml);
        }
        self.$wrap.addClass("zoom-off");
        self.$picMain.hide();
        $(".video-main","#gallery_wrap").attr("src",$video).show();
    },
    zoomMouseover:function(){
        if(this.$wrap.hasClass("zoom-off")){
            return;
        }
        this.$zoom.stop().fadeIn();
        this.$float.stop().fadeIn();
        this.$picMain.css({"opacity":.4});
    },
    zoomMousemove:function(e){
        var left = e.pageX-this.$wrap.offset().left - this.$float.width() / 2,
            top = e.pageY-this.$wrap.offset().top - this.$float.height() / 2,
            newLeft = this.$wrap.width() - this.$float.width(),
            newTop = this.$wrap.height() - this.$float.height();

        if (left < 0) {
            left = 0;
        } else if (left > newLeft) {
            left = newLeft;
        }

        if (top < 0) {
            top = 0;
        } else if (top > newTop) {
            top = newTop;
        }

        var percentX = left / (this.$wrap.width() - this.$float.width()),
            percentY = top / (this.$wrap.height() - this.$float.height()),
            $zoomImg = this.$zoom.find("img"),
            $zoomLeft = percentX * ($zoomImg.width() - this.$zoom.width()),
            $zoomTop = percentY * ($zoomImg.height() - this.$zoom.height());

        this.$float.css({"left":left,"top":top});
        this.$picCopy.css({"left":-left,"top":-top});
        $zoomImg.css({"left":-$zoomLeft,"top":-$zoomTop});

    },
    zoomMouseout:function(){
        this.$zoom.stop().fadeOut();
        this.$float.stop().fadeOut();
        this.$picMain.css({"opacity":1});
    },
    addTag:function(){
        var self = this;
        self.$thumbBoxLi.eq(0).addClass("tag");
    },
    obtainWidth:function(){
        var self = this;
        self.width = self.$thumbBoxLi.outerWidth();
        self.len = self.$thumbBoxLi.length;
        self.$thumbBoxUl.css({'width':self.len*self.width});
        if(self.$thumbBoxUl.find(".tag").length){
            self.$thumbBoxUl.css({'left': -self.$thumbBoxUl.find(".tag").position().left});
        }
    },
    initializeScroll:function(){
        var self=this;
        if(self.len<4){
            self.$nextBtn.addClass("disabled").hide();
            self.$prevBtn.addClass("disabled").hide();
        }
        if(self.$thumbBoxUl.position().left<10){
            self.$prevBtn.addClass("disabled");
        }
    },
    prevScroll:function(e){
        var self=this;
        if($(e.currentTarget).hasClass("disabled")){
            return;
        }
        self.distance = parseInt(self.$thumbBoxUl.css("left"))+self.width;
        self.picScroll(self.distance,function(){
            self.$thumbBoxUl.find(".tag").prev().addClass("tag").siblings().removeClass("tag");
        });

    },
    nextScroll:function(e){
        var self=this;
        if($(e.currentTarget).hasClass("disabled")){
            return;
        }
        self.distance = parseInt(self.$thumbBoxUl.css("left"))-self.width;
        self.picScroll(self.distance,function(){
            if(self.distance > (3-self.len)*self.width){
                self.$thumbBoxUl.find(".tag").next().addClass("tag").siblings().removeClass("tag");
            }
        });
    },
    picScroll:function(distance,callback){
        var self = this;
        if(self.$thumbBoxUl.is(":animated")) {
            return;
        }
        self.$thumbBoxUl.animate({"left":distance},500,function(){
            if(distance==0){
                self.$prevBtn.addClass("disabled");
            }else if(distance==(4-self.len)*self.width){
                self.$nextBtn.addClass("disabled");
            }else {
                self.$nextBtn.removeClass("disabled");
                self.$prevBtn.removeClass("disabled");
            }
            callback && callback();
        });
    }
};

//画廊弹出层
var galleryLayer = {
    initialize:function(){
        this.$btn = $('#gallery_wrap,#viewlayer_btn');
        this.$layer = $('#gallery_layer_wrap');
        this.$closedBtn = $('#gallery_layer_close');
        this.$list = $("#gallery_layer_list");
        this.initEvent();
    },
    initEvent:function(){
        this.$btn.on("click",$.proxy(this.open, this));
        this.$closedBtn.on("click",$.proxy(this.closed, this));
        this.$list.on("click","li",$.proxy(this.switchClidk, this));
        $("#svg_gallery_prev").on("click",$.proxy(this.scrollPrev, this));
        $("#svg_gallery_next").on("click",$.proxy(this.scrollNext, this));
    },
    calculate:function(){
        var self = this,
            $li =  self.$list.find("li"),
            width = $li.outerWidth()*($li.length+1),
            index = $(".active","#thumb_box").index();

        self.$list.width(width).find("li").eq(index).trigger("click");
        self.$list.find(".video").remove();
    },
    switchClidk:function(e){
         var self = this,
            distance = 0,
            $zoom = $(e.currentTarget).find("a").data("zoom");
        $(e.currentTarget).addClass("active").siblings().removeClass("active");
        $("#gallery_layer_img").find("img").attr({"src":$zoom});

        var $left = self.$list.find(".active").position().left;
        ($left-640)>0?distance=-($left-640) : distance =0;
        self.$list.animate({"left":distance},500);

    },
    scrollNext:function(e){
        this.$list.find(".active").next().addClass("active").trigger("click").siblings().removeClass("active");
    },
    scrollPrev:function(e){
        this.$list.find(".active").prev().addClass("active").trigger("click").siblings().removeClass("active");
    },
    open:function(){
        var self = this,$width;
        $(window).width() > 1200 ? $width = 1180 : $width = 940;
        layer.open({
            type: 1,
            title: false,
            area: '1180px',
            fix: false,
            offset: '100px',
            closeBtn: 0,
            content: $("#gallery_layer_wrap"),
            shadeClose:true,
            success: function(layero, index){
                setTimeout(function(){
                   self.calculate();
                },1000)

            }
        });

    },
    closed:function(){
        layer.closeAll();
    }
}

////Two-column布局
//var towColumu = {
//    initialize:function(){
//        this.$columns = $('.description-container');
//        this.$mod=this.$columns.find('.content-mod');
//        this.initEvent();
//    },
//    initEvent:function(){
//        this.layout();
//        $(window).on("resize",$.proxy(this.layout, this));
//    },
//    layout:function(){
//        var self = this,
//            cols = [0,0];
//        self.$mod.each(function(){
//              var l,
//                  h = $(this).height(),
//                  w = $(this).outerWidth();
//              $(window).width()<1200?l=15:l=45
//              $(this).css({position: 'absolute'});
//              if(cols[0] > cols[1]){
//                  $(this).css({ top: cols[1], left: w+l });
//                  cols[1] += (h+30);
//              } else {
//                  $(this).css({ top: cols[0], left: 0});
//                  cols[0] += (h+30);
//              }
//        });
//        this.$columns.height(Math.max(cols[0], cols[1]));
//    }
//};

//点击滚动到评论
var scrollToReviews = {
    initialize:function(){
        this.$btn = $('#to_review_a,#to_review_b');
        this.top="";
        this.initEvent();
    },
    initEvent:function(){
        this.$btn.on("click",$.proxy(this.scroll, this));

    },
    scroll:function(){
        var self = this;

        this.top = $("#customer_reviews").offset().top-70
        $("body,html").animate({scrollTop:self.top},500);
    }
}

//评论
var comment={
    initialize:function(){
        this.$writeReview = $('#write_review');
        this.$firstWiteReview = $('#J_first_write_review');
        this.$commentsForm = $('#comments_form');
        this.$commentSubmit = $('#comment_submit');
        this.$commentSuccessful = $('#comment_successful');
        this.$awesomeBtn = $('#awesome_btn');
        this.initEvent();
    },
    initEvent:function(){
        this.$writeReview.on("click",$.proxy(this.formShow, this));
        this.$commentSubmit.on("click",$.proxy(this.submit, this));
        this.$awesomeBtn.on("click",$.proxy(this.closed, this));
        this.$firstWiteReview.on("click",$.proxy(this.formFirstShow, this));
    },
    formFirstShow:function(){
        $('.comments-noReview-wrap').hide();
        this.$commentSuccessful.hide();
        this.$commentsForm.fadeIn(function(){
             setUpdate ();
        });
    },
    formShow:function(){
        this.$commentSuccessful.hide();
        this.$commentsForm.fadeIn();
    },
    submit:function(){
        this.$commentsForm.hide();
        this.$commentSuccessful.fadeIn();
    },
    closed:function(){
        this.$commentSuccessful.fadeOut();
    }
};

//打分 事件
var rating = {
    initialize: function() {
        this.num = 0;
        this.initEvent()
    },
    initEvent: function(){
        $(".score-box").on("mouseover click","a",this.rateIt)
                       .on("mouseleave","a",this.rateHover);

    },
    rateHover:function(e){
        $(e.currentTarget).parent().find('a').removeClass("hover");
    },
    rateIt: function(e){
        this.num = $(e.currentTarget).index();
        var eType=e.type;
        var list = $(e.currentTarget).parent().find('a');
        var className = "";
        switch(eType){
            case'mouseover':
                className = "hover";
                break;
            case'click':
                className = "on";
                break;
        }
        for(var i=0;i<=this.num;i++){
            list.eq(i).addClass(className);
        }
        for(var i=this.num+1,len=list.length-1;i<=len;i++){
            list.eq(i).removeClass(className);
        }
    }
};




function alsoBoughtScroll() {
    var alsoBoughtScroll = new loopScroll({
        "ele": "also_bought_scroll"
    });
    alsoBoughtScroll.initialize();
};

function recommendScroll (){
    var recommendScroll = new loopScroll({
        "ele":"recommend_scroll"
    });
    recommendScroll.initialize();
};

function historyScroll (){
    var historyScroll = new loopScroll({
        "ele":"history_scroll"
    });
    historyScroll.initialize();
};

