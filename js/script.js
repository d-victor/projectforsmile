(function( $ ) {
    $(document).ready(function () {
        var countdb = {
            favorites: 1,
            comparison: 1,
            cart: 1
        },
            rates={
                counts:1,
                summa:4.5
            };
        function tabs(e) {
            var btnTab=$("#"+e.attr("id")+" a");
            $("#"+e.attr("id")+"_content > div").css({"display":"none"});
            $("#"+e.attr("id")+"_content > div:first-child").css({"display":"block"}).addClass("active");
            btnTab.click(function () {
                $("#"+e.attr("id")+"_content > .active").hide();
                $("#"+$(this).attr("id")+"_content").show().addClass("active");
                btnTab.removeClass("active");
                $(this).addClass("active");
                return false;
            });
        };

        /*function liteBox(e) {

         console.log($("a[data-lightbox]"));
         }
         $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function() {
         liteBox(this);
         return false;
         });*/

        $(".ansver").click(function () {
            $(this).parent().parent().parent().children(".ansver_box").toggle(200);
            return false
        });

        var flagForma=false;
        function formaView(item) {
            flagForma=true;
            $(item).parent().parent().parent().append('<div class="reply_box"><form action="" method="post"><p>Ваше сообщение</p>' +
                '<textarea class="" name="text" _required="required" data-title="Ваше сообщение" autofocus=""></textarea>' +
                '<p>Ваше имя</p>' +
                '<input type="text" class="reply-name" name="name" data-title="Ваше имя">' +
                '<p>Эл. почта</p>' +
                '<input type="text" class="input-text pp-reply-f-input-text" name="login" _required="required" data-title="Эл.&nbsp;почта или телефон">' +
                '<button type="submit" class="btn-reply" data-title="Добавить">Добавить</button>' +
                '<a href="#" class="reply-no" name="cancel">Отменить</a></form></div>');
            $(".reply-no").click(function () {
                $(this).parent().parent().remove();
                flagForma=false;
                return flagForma;
            });
            return flagForma;
        }
        $(".reply").click(function () {
            (!flagForma)?flag=formaView($(this)):"";

            return false;
        });

        function showHide(parentEl, hideEl, heightEl, count, textView) {

            var tabCount = heightEl.length,
                heightStart = (count[1] == 0) ? hideEl.outerHeight(true) : count[1] + "rem",
                heightEnd = (count[1] == 0) ? heightEl.outerHeight(true) * count[0] : heightEl.outerHeight(true);

            function anim(item, h) {
                item.animate({"height": h}, function () {
                    item.css({"overflow": "visible", "height": "auto"});
                });
            }

            if (tabCount > count[0]) {
                hideEl.css({"height": heightEnd});
                parentEl.append("<a class='view_all' id='view_" + parentEl.attr("id") + "' href='#'><i class='icons chevron-down'></i>" + textView[0] + "</a>" +
                    "<a class='hide_all' id='hide_" + parentEl.attr("id") + "' href='#'><i class='icons chevron-up'></i>" + textView[1] + "</a>");
                $("#view_" + parentEl.attr("id")).css({"display": "inline"}).click(function () {
                    $(this).css({"display": "none"});
                    hideEl.animate({"height": heightStart}, function () {
                        $(this).css({"overflow": "visible", "height": "auto"});
                    });
                    $("#hide_" + parentEl.attr("id")).css({"display": "inline"}).click(function () {
                        $(this).css({"display": "none"});
                        hideEl.animate({"height": heightEnd}, function () {
                            $(this).css({"overflow": "hidden", "height": heightEnd});
                        });
                        $("#view_" + parentEl.attr("id")).css({"display": "inline"});
                        return false
                    });
                    return false;
                });
            }
        }

/*        function tabs(e) {
            var btnTab=$("#"+e.attr("id")+" a");
            $("#"+e.attr("id")+"_content > div").css({"display":"none"});
            $("#"+e.attr("id")+"_content > div:first-child").css({"display":"block"}).addClass("active");
            btnTab.click(function () {
                $("#"+e.attr("id")+"_content > .active").hide();
                $("#"+$(this).attr("id")+"_content").show().addClass("active");
                btnTab.removeClass("active");
                $(this).addClass("active");
                return false;
            });
        };*/

        function heightItem(item) {
            var h = 0;
            $(item).each(function () {
                h += $(this).outerHeight();
            });
            return h;
        }

        function openItem(item, h, menu) {
            (!item.hasClass("active")) ? $(menu).height(h) : $(menu).height(0);
            item.toggleClass("active");
        }

        function marck() {
            $.each(countdb, function (key, value) {
                (value != 0) ? $("." + key).append("<span class='count' id='count_'" + key + ">" + value + "</span>") : "";
            })
        }
        marck();
        $(".menu_city_item").click(function () {
            var heigCity = heightItem($(".menu_city_content li"));
            openItem($(this), heigCity, $(".menu_city_content"));
        });
        $(".main_menu_title").click(function () {
            var h = heightItem($("#catalog li"));
            openItem($(this), h, $("#catalog"));
        });
        /*zoom*/
        function startZoom(e) {
            $(this).css({'background-size': '150%'});
        }

        function moveZoom(e) {
            var offset = $(this).offset(),
                x = (e.pageX - offset.left),
                y = (e.pageY - offset.top),
                w = $(this).width(),
                h = $(this).height();
            $(this).css({'background-position': (x / w * 100) + '% ' + (y / h * 100) + '%'});
        }

        function endZoom(e) {
            $(this).css({'background-position': 'center'});
            $(this).css({'background-size': '100%'});
        }

        $('#phto-main').on({
            'mouseenter': startZoom,
            'mousemove': moveZoom,
            'mouseleave': endZoom
        });

        $(".video").click(function () {
              var url= $(this).children().attr("data-src");

            $("body").append("<div class='video_box'><span class='close'></span></div>" +
                "<div class='play_window'>" +
                "<iframe id='video' src='https://www.youtube.com/embed/"+ url +"?autoplay=1&autohide=1&rel=0' frameborder='0' allowfullscreen autoplya></iframe>" +
                "</div>");
            $(".video_box").click(function () {
                $(this).remove();
                $(".play_window").remove();
            });
            var winH = $(window).height() - $(window).height() / 10;
            $(".play_window").height(winH);
            return false;
        });
       function rate(e) {

           e.click(function () {
               rates.counts+=1;
               rates.summa+=Number(this.getAttribute("data-rate"));
               recalc();
           });
           function recalc() {
               var rate_item=$(e).children(".rate_item_active"),
                   rate=(rates.counts!=0)?rates.summa/rates.counts:0;
               for (var i=4; i>=0; i--){
                   (rate>=1)?$(rate_item[i]).css({"width":"11px"}):$(rate_item[i]).css({"width":rate*11});
                   rate-=1;
               }
           }
           recalc();
       }

       /*slider*/


        function slider(e, addEl) {
            var sliderBox=e.children("ul"),
                slide=sliderBox.children("li"),
                widthSlide=slide.outerWidth(),
                count=slide.length+addEl*2,
                start=-widthSlide*(addEl),
                position=start,
                flagSlide=true;
            //console.log(e);
            e.append("<div class='slider_box'></div>");
            e.children(".slider_box").append(sliderBox);
            if(addEl>=4){
                for(var i=1; i<=addEl; i++) {
                    sliderBox.prepend($.clone(slide[slide.length-i])).append($.clone(slide[i-1]));
                }
            }else {
                sliderBox.prepend($.clone(slide[slide.length-1])).append($.clone(slide[0]));
            }
            sliderBox.css({"width":widthSlide*count, "marginLeft":start});
            e.append("<div class='slid_btn'><span class='left_btn icons chevron-left' id='left_"+e.attr("id")+"' data-id='left' ></span>" +
                "<span class='right_btn icons chevron-right' id='right"+ e.attr("id") +"' data-id='right'></span></div>");
            function next(p) {

                var nav=$(p).attr("data-id");

                if(nav=="left"){
                    if(position==0){
                        position=-widthSlide*(slide.length);
                        sliderBox.css({'marginLeft':position});
                    }
                    position+=widthSlide;
                }else {
                    if(addEl>=4) {
                        if (position == -widthSlide * (slide.length + addEl) + widthSlide) {

                            position = start + widthSlide;
                            sliderBox.css({'marginLeft': position});
                        }
                    }else {

                        if(position == -widthSlide * count+widthSlide*2){
                            position = start + widthSlide;
                            sliderBox.css({'marginLeft': position});
                        }
                    }
                    position-=widthSlide;
                }
                flagSlide=false;
                sliderBox.animate({"marginLeft":position}, 300, function () {
                    setTimeout(flagSlide=true, 100);
                });
            }
            $("#left_"+ e.attr("id")).click(function () {
                if(flagSlide)next(this);
            });
            $("#right"+ e.attr("id")).click(function () {
                if(flagSlide)next(this);
            })

        }



         function filtred(e) {
            var btn=$("#"+e.attr("id")+" a");
            $.each(btn, function () {
                slider($("#"+e.attr("id")+"_slider_cont_"+$(this).attr("data-filter")), 4);
                if(!$(this).parent().hasClass("active")){
                    $("#"+e.attr("id")+"_slider_cont_"+$(this).attr("data-filter")).hide();
                }
            });
            btn.click(function () {
                if(!$(this).parent().hasClass("active")) {
                    $("#" + e.attr("id") + " li").removeClass("active");
                    $(this).parent().addClass("active");
                    $("#" + e.attr("id") + "_slider_tabs > div").hide(500);
                    $("#" + e.attr("id") + "_slider_cont_" + $(this).attr("data-filter")).show(500);
                }
                return false;
            });
        }
$(".show_similar_item").click(function () {
    $(".similar_item_sliders").slideToggle();
    return false;
});

        function selected(e, filters) {
            var item=$("#"+e.attr("id")+" ul li"),
                box=$("#"+e.attr("id")+" ul").hide(),
                title=$("#"+e.attr("id")+" .title").click(function () {
                    box.slideToggle();
                });
            $.each(item, function () {
                if($(this).hasClass("active")){
                    title.text($(this).text());
                }
            });
            if (filters!=undefined){
                var btn=$(e).children("ul").children("li");

                $.each(btn, function () {
                    slider($("#"+$(this).attr("data-filter")), 4);
                    if(!$(this).hasClass("active")){
                        $("#"+$(this).attr("data-filter")).hide();
                    }
                    $(this).click(function () {
                       if(!$(this).hasClass("active")){
                           $(this).parent().children("li").removeClass("active");
                           $(this).addClass("active");
                           $(filters).children().slideUp(500);
                           $("#"+$(btn).attr("data-filter")).slideDown(500);
                           //console.log();
                       }
                    });
                })
            }
            item.click(function () {
                title.text($(this).text());
                box.slideToggle();

            })
        }
        selected($("#cars"));
        selected($("#tel"));
        selected($("#sity"));
        selected($("#cars_for_slider"), $("#filter_sliders_cars"));
        showHide($("#char_content"), $("#char_table"), $("#char_table table tr"), [7, 0], ["Показать все характеристики", "Скрыть характеристики"]);
        showHide($("#desc_content"), $("#text_box"), $("#text_box p"), [2, 0], ["Подробнее", "Скрыть"]);
        showHide($("#revs_content"), $("#revs_content .box"),$("#revs_content .box .rev"), [3, 0], ["Показать все отзывы", "Скрыть все отзывы"]);
        showHide($("#questions_content"), $("#questions_content .box"), $("#questions_content .box .rev"), [2, 0], ["Показать все вопросы", "Скрыть все вопросы"]);
        showHide($("#comap_right"), $("#compar_box"), $(".compar_item"), [1, 0], ["Показать все похожие товары", "Скрыть все похожие товары"]);
        tabs($("#main_tabs"));
        tabs($("#tab_rev"));
        filtred($("#filter"));
        slider($("#slider-similar"), 4);
        slider($("#art_slider"), 1);
        slider($("#you_viewr"), 4);
        rate($("#rate_pokupki_info ul li"));
        rate($("#rate_i-1 ul li"));
    });
})(jQuery);