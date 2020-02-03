$(function () {
    // var commonUI = new CommonUI('#gnb', '#navTab').init();
    //   wayp();

    dataFn();
    common.init();
    if ($('#mainPage').length) return main.init();
});

// commonUI
var common = {
    load: function () {
        $('.layer').show();
        var scr = $(window).scrollTop();
        // console.log(scr);
        if (scr > 80) {
            $('#header').addClass('affix');
        }
    },
    resize: function () {
        $(window).resize(function () {
            var winWd = $(window).width()
            var smBreakPoint = 992;
            var scrollBar = 17;
            var smBrowserPoint = smBreakPoint + scrollBar;
            if (winWd < smBrowserPoint) {
                $('.modal-transition-block').hide();
                setTimeout(function () {
                    $('.modal-transition-block').addClass('mobile');
                }, 100);
            } else {
                $('.modal-transition-block').show();
                $('.modal-transition-block').removeClass('mobile');
            }
        }).resize();
    },
    scroll: function () {
        var gnb = $('#gnb');
        var goTop = $('#goTop');
        var headerHt = gnb.outerHeight();
        // console.log(headerHt);
        $(window).on('scroll', function () {
            var scr = $(window).scrollTop();
            if (scr > headerHt) {
                gnb.addClass('affix');
            } else {
                gnb.removeClass('affix');
            }
            if (scr > 200) {
                goTop.fadeIn();
            } else {
                goTop.fadeOut();
            }
        });
    },
    nav: function () {
        var navTab = $('#navTab');
        var navBar = $('#navBar');
        var winWd = 0;
        var smBreakPoint = 992;
        var scrollBar = 17;
        var smBrowserPoint = smBreakPoint + scrollBar;
        $(window).resize(function () {
            winWd = $(window).width();
        }).resize();

        navBar.find('.menu > .in-link a').on('click', function (e) {
            var hdHt = 0;
            if (winWd < smBrowserPoint) {
                navBar.removeClass('active');
                hdHt = 45;
            } else {
                hdHt = 60;
            }
            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - hdHt
            }, 500, 'easeInOutQuad');
            e.preventDefault();

        });
        navTab.on('click', function () {
            navBar.toggleClass('active');
        });
    },
    init: function () {
        common.load();
        common.scroll();
        common.nav();
        // common.resize();
    }

}

// mainUI
var main = {
    init: function () {
        this.wayPoint();
        this.visualBannerList()
        this.newsbarNewsList()
        this.guideVideoList()
        this.roadmapList()
        this.newsList()
        // main.load();
        // main.visualActions();
        // main.facilityPictureList();
        // main.lookCardList();
    },
    visualBannerList: function () {
        $('#visualBannerList').slick({
            autoplay: true,
            // autoplaySpeed: 2000,
            appendArrows: '#bannerArrow',
            prevArrow: '<button type="button" class="slick-prev"><img src="/images/icon/btn_prev.png" alt="이전"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="/images/icon/btn_next.png" alt="다음"></button>',
            // infinite: false,
        });
    },
    newsbarNewsList: function () {
        $('#newsbarNewsList').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            vertical: true,
            prevArrow: '',
            nextArrow: ''
            // infinite: false,
        });
    },
    guideVideoList: function () {
        $('#guideVideoList').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            prevArrow: '',
            nextArrow: '',
            // infinite: false,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }],
        });
    },
    roadmapList: function () {
        $('#roadmapList').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: false,
            pauseOnHover: false,
            prevArrow: '',
            nextArrow: '',
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });
    },
    newsList: function () {
        $('[id*=newsList-]').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 6,
            slidesToScroll: 1,
            vertical: true,
            prevArrow: '',
            nextArrow: ''
            // infinite: false,
        });
    },
    // lookCardList: function () {
    //     $('#lookCardList').slick({
    //         autoplay: true,
    //         autoplaySpeed: 2000,
    //         centerMode: true,
    //         centerPadding: '100px',
    //         slidesToShow: 3,
    //         // slidesToShow: 'auto',
    //         infinite: true,
    //         // infinite: false,
    //         responsive: [{
    //                 breakpoint: 1360,
    //                 settings: {
    //                     centerMode: true,
    //                     centerPadding: '100px',
    //                     slidesToShow: 2,
    //                 }
    //             },
    //             {
    //                 breakpoint: 992,
    //                 settings: {
    //                     centerMode: true,
    //                     centerPadding: '60px',
    //                     slidesToShow: 1,
    //                 }
    //             },
    //         ],
    //     });
    // },
    wayPoint: function () {
        $('#container .wayp-item').each(function (index, item) {
            $(item).addClass('blind');
            $(item).waypoint(
                function () {
                    $(item).addClass('animated fadeInUp');
                }, {
                    offset: '70%',
                }
            );
        });
        $('#container .wayp-item-left').each(function (index, item) {
            $(item).addClass('blind');
            $(item).waypoint(
                function () {
                    $(item).addClass('animated fadeInLeft');
                }, {
                    offset: '70%',
                }
            );
        });
        $('#container .wayp-item-right').each(function (index, item) {
            $(item).addClass('blind');
            $(item).waypoint(
                function () {
                    $(item).addClass('animated fadeInRight');
                }, {
                    offset: '70%',
                }
            );
        });
    },
};

function targetHide(obj) {
    $(obj).on('click', function (e) {
        if ($(e.target).is(obj)) {
            $(obj).removeClass('active');
        }
        // console.log(e.terget);
    });
}

function anotherTargetToggle(obj) {
    var el = obj;
    var elChild = obj + ' *';
    $('body').on('click', function (e) {
        if (
            !$(e.target).is(el) &&
            !$(e.target).is(elChild)
        ) {
            $(el).removeClass('active').removeClass('on');
        }
        // console.log(elChild);
        // console.log(e.target);
    });
}

// 페이지 로딩시 적용 
function dataFn() {
    var modal = $('.modal'),
        lastFocus;
    $('[data-toggle]').on('click', function () {
        lastFocus = $(this);
        var objNm = $(this).attr('data-target'),
            obj = $('.' + objNm),
            type = $(this).attr('data-toggle');

        switch (type) {
            case ('modal'):
                modalFn.enter(obj);
                break;
            default:
                break;
        }
    });
    $('[data-dismiss]').on('click', function () {
        var type = $(this).attr('data-dismiss'),
            obj = $(this).closest('.' + type);
        switch (type) {
            case ('modal'):
                modalFn.leave(obj);
                break;
            default:
                break;
        }
    });
    $(document).on('keydown', function (e) {
        var obj = modal;
        if (e.keyCode == 27) {
            modalFn.leave(obj);
        }
    });
    modal.on('click', function (e) {
        var obj = $(this);
        if (!$(e.target).is('.modal-wrapper *')) {
            modalFn.leave(obj);
        }
    });

    // 모달 영역
    var modalFn = {
        enter: function (obj) {
            obj.addClass('enter');
            obj.focus();
            $("#wrap").attr('aria-hidden', true);
        },
        leave: function (obj) {
            obj.addClass('leave');
            obj.removeClass('enter');
            setTimeout(function () {
                obj.removeClass('leave');
            }, 300);
            $("#wrap").attr('aria-hidden', false);
            lastFocus.focus();
        }
    }
}

// lazyload
// $("#wrapperr .slide").lazyload({
//     effect: "fadeIn"
// });