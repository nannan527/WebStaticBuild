function maxHeight(){
     var array = [];
     var $item = $(".information-item",".order-information");
     $item.css('minHeight','');
     $item.each(function(i){
              var $h = parseInt($(this).height());
              array.push($h);
     });
     var maxH = Math.max.apply(null, array);
     $item.css('minHeight',maxH);

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
$(function(){
    maxHeight();
    rating.initialize();
});
