/**
 * Created by dongyinan on 2016/1/6.
 */
//头部搜索框效果
var headSearch = {
    initialize:function(){
        this.$ele=$("#search_wrapper");
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

var giSeach ={
    initialize:function(){
        this.$ele=$("#gi_search_wrapper,#gi_search_right");
        this.$input=this.$ele.find(".search-input");
        this.$list=this.$ele.find(".seach-list");
        this.initEvent();
    },
    initEvent:function(){
        this.$input.on("focus",$.proxy(headSearch.focus, this));
        this.$input.on("blur",$.proxy(headSearch.blur, this));
        //this.$input.on("input propertychange",$.proxy(headSearch.input, this));
        //this.$list.on("click","a",$.proxy(headSearch.click, this))
    }
};

//页面滚动超过头部高度时，头部悬浮效果
var headFixer = {
    initialize:function(){
        this.$body=$("body");
        this.$ele=$(".header");
        this.$giEle = $("#gi_top_nav");
        this.$h=this.$ele.height();
        this.initEvent();
    },
    initEvent:function(){
        this.scroll();
        $(window).on("scroll",$.proxy(this.scroll, this));
    },
    scroll:function(){
        var self = this,
            flag = self.$ele.hasClass('header-special');

        if( $(window).scrollTop() > self.$h ){

            flag ? self.$ele.css('position', 'fixed') : self.$ele.addClass("header-fixed");

            if(self.$giEle.length){
                    self.$giEle.show();
                    self.$ele.find(".category-nav").hide();
            }

            self.$body.css("padding-top",self.$h);

        }else{

            flag ? self.$ele.css('position', '') : self.$ele.removeClass("header-fixed");

            if(self.$giEle.length){
                    self.$giEle.hide();
                    self.$ele.find(".category-nav").show();
            }

            self.$body.css("padding-top","");

        }
    }
};


//返回顶部
var backTop = (function(){
     var $el = $('#back-top'),$top;

     //函数防抖
     function debounce(fn, delay) {
           var time = null;
           return function(){
                var _this = this,
                    args = arguments;

                clearTimeout(time);

                setTimeout(function(){
                     fn.apply(_this, args);
                }, delay)
           }
     };

     $(window).on("scroll", debounce(function(){
           var $top = $(window).scrollTop();
           $top > 400 ? $el.fadeIn() : $el.fadeOut()
     }, 200));

     $el.on('click',function(){
         $('html,body').animate({scrollTop: '0px'},500);
     });
})();



$(function(){
    headSearch.initialize();
    headFixer.initialize();
    if($("#gi_search_wrapper")){
        giSeach.initialize();
    };

});
