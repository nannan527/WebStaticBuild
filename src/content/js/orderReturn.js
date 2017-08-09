/**
 * Created by Dongyinan on 2016/2/3.
 */
//order return 按钮操作
var orderReturn = {
    initialize: function() {
        this.returnAllBtn = $("#return_all");
        this.continueBtn=$("#continue_btn");
        this.editBtn=$("#edit_btn");
        this.$policy=$("#policy");
        this.$acceptBtn=$("#accept_btn");
        this.initEvent();
    },
    initEvent: function(){
        $(document).on("click",".return-btn",$.proxy(this.show, this));
        $(document).on("click",".close",$.proxy(this.closed, this));
        this.continueBtn.on("click",$.proxy(this.returnPolicy, this));
        this.editBtn.on("click",$.proxy(this.editReturn, this));
        $("#own_shipment").on("click",$.proxy(this.ownShipment, this));
        $(document).on("click",".back-policy",$.proxy(this.backPolicy, this));
        this.$acceptBtn.on("click",$.proxy(this.originalBox, this));
        $("#original").on("click",$.proxy(this.originalBox, this));
        $("#not_original").on("click",$.proxy(this.nonOriginalBox, this));
        $("#continue_btn_b").on("click",$.proxy(this.nonOriginalBox_b, this));
        $("#edit_num").on("click",$.proxy(this.nonOriginalBox_edit, this));
    },
    show:function(e){
        $(e.currentTarget).hide().parent().addClass("editor")
            .find(".close").fadeIn()
            .end().find(".return-qty").fadeIn()
            .end().find(".return-form").fadeIn();
    },
    closed:function(e){
        $(e.currentTarget).hide().parent()
            .find(".return-btn").fadeIn()
            .end().find(".return-qty").fadeOut()
            .end().find(".return-form").fadeOut(function(){
                  $(e.currentTarget).parent().removeClass("editor")
            });

    },
    returnPolicy:function(e){
        this.editBtn.css({"display":"inline-block"}).prevAll().hide();
        this.returnAllBtn.hide();
        $(".dl-content").css("height",$(window).height()*2);
        this.$policy.next().addBack().fadeIn();
        var top = this.$policy.offset().top-60-$(".order-return-list-a").height()+$(".order-return-list-a").children("li").length*210;
        this.scroll(top);
        $(".order-return-list-a").children("li").each(function(i){
                var $closeBtn = $(this).find(".close"),
                    $returnBtn = $(this).find(".return-btn");
                if($closeBtn.is(":visible")){
                    $closeBtn.trigger("click").hide();
                };
                $returnBtn.hide();
        });
    },
    editReturn:function(e){
        $(e.currentTarget).hide().prevAll().css({"display":"inline-block"});
        this.returnAllBtn.css({"display":"inline-block"});
        $(".dl-content").css("height","");
        this.$policy.nextAll().addBack().hide();
        $("html,body").animate({"scrollTop":0});
        $("li",".order-return-list-a").each(function(i){
              $(this).find(".return-btn").css({"display":"inline-block"});
        });
    },
    scroll:function(top){
        $("html,body").animate({"scrollTop":top});
    },
    ownShipment:function(){
        $("#own_shipment_content").fadeIn().prev().hide();
    },
    backPolicy:function(){
        $("#policy_btn").fadeIn().nextAll().hide();
    },
    originalBox:function(){
        $("#policy_btn,#original_content").fadeOut();
        $("#original_content").fadeIn();
        $(".dl-content").css("height","");
    },
    nonOriginalBox:function(){
        $("#original_content").fadeOut();
        $("#non_original_content").fadeIn();
    },
    nonOriginalBox_b:function(e){
        $(e.currentTarget).parent(".order-return-btn").hide().prev(".last").find(".edit-num").prev().hide().end().end().find(".qty-s").hide().prev(".num").fadeIn();
        $(e.currentTarget).parents(".order-information").nextAll().fadeIn();
        $(e.currentTarget).parents("#non_original_content").find(".own-shipment-content").fadeIn();
        $("#edit_num").fadeIn();
    },
    nonOriginalBox_edit:function(e){
        $(e.currentTarget).parent().prev().fadeIn();
        $(e.currentTarget).parents(".last").next().fadeIn().end().find(".qty-s").fadeIn().prev().hide();
        $(e.currentTarget).parents(".order-information").nextAll().hide();
        $(e.currentTarget).parents("#non_original_content").find(".own-shipment-content").hide();
        $("#edit_num").hide();
    }

}

//$('html, body').animate({scrollTop:'0px','fast',function(){}});





$(function(){
    orderReturn.initialize();
});