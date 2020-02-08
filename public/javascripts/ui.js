$(function () {
    // var commonUI = new CommonUI('#gnb', '#navTab').init();
    //   wayp();

    dataFn();
    common.init();
    if ($('#mainPage').length) return main.init();
});

// commonUI
var common = {
    common: function () {
        var wdVar = 0;
        var hdHtVar = 0;
        var smBreakPointVar = 992;
        var scrollBarVar = 17;
        // var scrollBarVar = 0;
        if ($(document).height() <= $(window).height()) {
            scrollBarVar = 0;
        }

        var smBrowserPointVar = smBreakPointVar - scrollBarVar;

        return {
            winWd: function () {
                $(window).resize(function () {
                    wdVar = $(window).width();
                }).resize();
                return wdVar;
            },
            smBrowserPoint: function () {
                return smBrowserPointVar;
            },
            hdHt: function () {
                if (this.winWd() < this.smBrowserPoint()) {
                    hdHtVar = 50;
                } else {
                    hdHtVar = 80;
                }
                return hdHtVar;
            }
        }
    },
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
        var hdHt = this.common().hdHt();
        var pageUrl, pageId;
        pageUrl = window.location.href;
        var params = getUrlParams();
        scrollParam = params.scroll;
        // console.log(scrollParam);
        // console.log($('#scroll_' + scrollParam));
        if (pageUrl.lastIndexOf("#") != -1) {
            pageId = pageUrl.substring(pageUrl.lastIndexOf("#") + 1);

            setTimeout(function () {
                $('html, body').scrollTop($('#scroll_' + pageId).offset().top - hdHt);
            }, 100);
        }
        if ($('#mainPage').length) {
            navBar.find('.menu > .in-link a').on('click', function (e) {
                e.preventDefault();

                pageUrl = $(this).attr('href');
                if (pageUrl.lastIndexOf("#") != -1) {
                    pageId = pageUrl.substring(pageUrl.lastIndexOf("#") + 1);

                    $('html, body').stop().animate({
                        scrollTop: $('#scroll_' + pageId).offset().top - hdHt
                    }, 500, 'easeInOutQuad');
                }
            });
        }
        if (!!scrollParam) {
            var scrollTarget = 'scroll_' + scrollParam;
            // console.log(hdHt);
            setTimeout(function () {
                $('html, body').scrollTop($('[data-scroll-target=' + scrollTarget + ']').offset().top - hdHt);
            }, 100);
        }
        navTab.on('click', function () {
            navBar.toggleClass('active');
        });
        navBar.find('.menu > .in-link a').on('click', function () {
            navBar.removeClass('active');
        });
        targetHide.self('#navBar');
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

var targetHide = {
    self: function (obj) {
        $(obj).on('click', function (e) {
            if ($(e.target).is(obj)) {
                $(obj).removeClass('active');
            }
            // console.log(e.terget);
        });
    },
    another: function (obj) {
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

// 모달 영역
var modalFn = {
    enter: function (obj) {
        obj.addClass('enter');
        obj.focus();
        $("#wrap").attr('aria-hidden', true);
    },
    leave: function (obj, lastFocus) {
        obj.addClass('leave');
        obj.removeClass('enter');
        setTimeout(function () {
            obj.removeClass('leave');
        }, 300);
        $("#wrap").attr('aria-hidden', false);
        if (lastFocus) lastFocus.focus();
    }
}

// 탭 용 label
var labelTabFn = {
    checkbox: function (obj) {
        var chk = obj.is(':checked');

        obj.closest('label').toggleClass('active');
        // console.log(obj.prop('checked'));
        obj.prop('checked') ? obj.prop('checked', false) : obj.prop('checked', true);
        // console.log(obj.prop('checked'));
    },
    radio: function (obj) {
        var chk = obj.is(':checked');
        var tabWrapper = $('[data-fn-type=tabs]');

        tabWrapper.find('label').removeClass('active');
        obj.closest('label').addClass('active');
        // el.addClass('active');
        // console.log(obj.prop('checked'));
        if (!chk) return obj.prop('checked', true);
        // console.log(obj.prop('checked'));
    }
}

var toggleTabFn = {
    seleted_tab: function () {
        var tabWrapper = $('[data-fn-type=toggle-tab]');
        // var bool = optionList.is(":hidden");
        // optionList.attr('hidden',!bool);
        tabWrapper.children('li').on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        });
    },
    init: function () {
        this.seleted_tab();
    }
}

// urlParams
function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });
    return params;
}

// Panel Accessibility(tab, arrow key ...)
function tabsFn() {
    var tablist = document.querySelectorAll('[role="tablist"]')[0];
    if (!tablist) return;
    var tabs;
    var panels;
    var delay = determineDelay();

    generateArrays();

    function generateArrays() {
        tabs = document.querySelectorAll('[role="tab"]');
        panels = document.querySelectorAll('[role="tabpanel"]');
    };

    // For easy reference
    var keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
    };

    // Add or substract depending on key pressed
    var direction = {
        37: -1,
        38: -1,
        39: 1,
        40: 1
    };

    // Bind listeners
    for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
    };

    function addListeners(index) {
        tabs[index].addEventListener('click', clickEventListener);
        tabs[index].addEventListener('keydown', keydownEventListener);
        tabs[index].addEventListener('keyup', keyupEventListener);

        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index;
    };

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener(event) {
        var tab = event.target;
        activateTab(tab, false);
    };

    // Handle keydown on tabs
    function keydownEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                // Activate last tab
                activateTab(tabs[tabs.length - 1]);
                break;
            case keys.home:
                event.preventDefault();
                // Activate first tab
                activateTab(tabs[0]);
                break;

                // Up and down are in keydown
                // because we need to prevent page scroll >:)
            case keys.up:
            case keys.down:
                determineOrientation(event);
                break;
        };
    };

    // Handle keyup on tabs
    function keyupEventListener(event) {
        var key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                determineOrientation(event);
                break;
            case keys.delete:
                determineDeletable(event);
                break;
        };
    };

    // When a tablist’s aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation(event) {
        var key = event.keyCode;
        var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;

        if (vertical) {
            if (key === keys.up || key === keys.down) {
                event.preventDefault();
                proceed = true;
            };
        } else {
            if (key === keys.left || key === keys.right) {
                proceed = true;
            };
        };

        if (proceed) {
            switchTabOnArrowPress(event);
        };
    };

    // Either focus the next, previous, first, or last tab
    // depening on key pressed
    function switchTabOnArrowPress(event) {
        var pressed = event.keyCode;

        for (x = 0; x < tabs.length; x++) {
            tabs[x].addEventListener('focus', focusEventHandler);
        };

        if (direction[pressed]) {
            var target = event.target;
            if (target.index !== undefined) {
                if (tabs[target.index + direction[pressed]]) {
                    tabs[target.index + direction[pressed]].focus();
                } else if (pressed === keys.left || pressed === keys.up) {
                    focusLastTab();
                } else if (pressed === keys.right || pressed == keys.down) {
                    focusFirstTab();
                };
            };
        };
    };

    // Activates any given tab panel
    function activateTab(tab, setFocus) {
        setFocus = setFocus || true;
        // Deactivate all other tabs
        deactivateTabs();

        // Remove tabindex attribute
        tab.removeAttribute('tabindex');

        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');

        // console.log(tab);
        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');
        // console.log(controls);

        // Remove hidden attribute from tab panel to make it visible
        document.getElementById(controls).removeAttribute('hidden');

        // Set focus when required
        if (setFocus) {
            tab.focus();
        };
    };

    // Deactivate all tabs and tab panels
    function deactivateTabs() {
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
            tabs[t].removeEventListener('focus', focusEventHandler);
        };

        for (p = 0; p < panels.length; p++) {
            panels[p].setAttribute('hidden', 'hidden');
        };
    };

    // Make a guess
    function focusFirstTab() {
        tabs[0].focus();
    };

    // Make a guess
    function focusLastTab() {
        tabs[tabs.length - 1].focus();
    };

    // Detect if a tab is deletable
    function determineDeletable(event) {
        target = event.target;

        if (target.getAttribute('data-deletable') !== null) {
            // Delete target tab
            deleteTab(event, target);

            // Update arrays related to tabs widget
            generateArrays();

            // Activate the closest tab to the one that was just deleted
            if (target.index - 1 < 0) {
                activateTab(tabs[0]);
            } else {
                activateTab(tabs[target.index - 1]);
            };
        };
    };

    // Deletes a tab and its panel
    function deleteTab(event) {
        var target = event.target;
        var panel = document.getElementById(target.getAttribute('aria-controls'));

        target.parentElement.removeChild(target);
        panel.parentElement.removeChild(panel);
    };

    // Determine whether there should be a delay
    // when user navigates with the arrow keys
    function determineDelay() {
        var hasDelay = tablist.hasAttribute('data-delay');
        var delay = 0;

        if (hasDelay) {
            var delayValue = tablist.getAttribute('data-delay');
            if (delayValue) {
                delay = delayValue;
            } else {
                // If no value is specified, default to 300ms
                delay = 300;
            };
        };

        return delay;
    };

    //
    function focusEventHandler(event) {
        var target = event.target;

        setTimeout(checkTabFocus, delay, target);
    };

    // Only activate tab on focus if it still has focus after the delay
    function checkTabFocus(target) {
        focused = document.activeElement;

        if (target === focused) {
            activateTab(target, false);
        };
    };
}

// lazyload
// $("#wrapperr .slide").lazyload({
//     effect: "fadeIn"
// });