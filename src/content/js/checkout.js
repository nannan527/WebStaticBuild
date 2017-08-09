//支付方式选择
function paymentSelect() {
    $(".payment-method").on('click', function () {
        var $val = $(".payment-method").find("input:checked").val();
        if ($val == 1) {
            $("#selectCreditCard").show();
            $("#selectShipping").hide();
            $("#pay_card").show();
            $("#pay_paypal,#pay_amazon").hide();
        }else
        if($val == 2){
            $("#selectShipping").show();
            $("#selectCreditCard").hide();
            $("#pay_paypal").show();
            $("#pay_card,#pay_amazon").hide();
        }else
        if($val == 3){
            $("#selectShipping").show();
            $("#selectCreditCard").hide();
            $("#pay_amazon").show();
            $("#pay_card,#pay_paypal").hide();
        }
        $(".payment-method").eq($val-1).addClass("active").siblings().removeClass("active");
        $(".click-here-box").show();
    })

};
//调用
$(function () {
    paymentSelect();
    //选择更多地址
    $(".chooseAddress").on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: '900px',
            closeBtn: 0,
            content: $("#addressList"),
            shadeClose: true,
            success: function (layero, index) {
                $(".close,.dialog-cancel",layero).off().on("click",function(){
                    layer.close(index);
                });
                $(".dialog-save",layero).off().on("click",function(){
                    layer.close(index);
                })

            }

        });
    });
    /**
     * 新增信用卡
     */
    $("#newCard-btn").on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: '901px',
            closeBtn: 0,
            content: $("#creditCard"),
            shadeClose: true,
            success: function (layero, index) {
                $(".close,.dialog-cancel",layero).off().on("click",function(){
                    layer.close(index);
                });
                $(".dialog-save",layero).off().on("click",function(){
                    layer.close(index);
                })

            }

        });
    });

    //新增地址
    $(".newAddress").on('click', function () {
        layer.open({
            type: 1,
            title: false,
            area: '900px',
            closeBtn: 0,
            content: $("#addressNew"),
            shadeClose: true,
            success: function (layero, index) {
                $(".close,.dialog-cancel",layero).off().on("click",function(){
                    layer.close(index);
                });
                // $(".dialog-save",layero).off().on("click",function(){
                //     layer.close(index);
                // })

            }

        });
    });
    //dialog中编辑地址
    $(".address-edit").on('click', function () {

        layer.open({
            type: 1,
            title: false,
            area: '900px',
            closeBtn: 0,
            content: $("#addressEdit"),
            shadeClose: true,
            success: function (layero, index) {
                $(".close,.dialog-cancel",layero).off().on("click",function(){
                    layer.close(index);
                });
                $(".dialog-save",layero).off().on("click",function(){
                    layer.close(index);
                })

            }

        });
    });
});
