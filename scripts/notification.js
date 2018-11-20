var click = "";
// 如果是移动端，click就为touchstart事件，如果为PC端，click就是单击事件
if ('ontouchstart' in window) {
    click = 'touchstart';
} else {
    click = 'click';
}
$(document).on(click, "section.chose_btn", function () {
    if (!$(this).hasClass('open')) {
        openMenu();
    } else {
        closeMenu();
    }
});
$(window).resize(function () {
    active();
    if ($(window).width() > 767) {
        $('#gifM').css("display", "none");
        var myVideo = document.getElementById("myVideo");
        $(myVideo).trigger("play");
        $('#myVideo').css("display", "");
    } else {
        $("section.notification").hide();
        $('#myVideo').css("display", "none");
        var myVideo = document.getElementById("myVideo");
        $(myVideo).trigger("pause");
        $('#gifM').css("display", "");
    }
});
$(function () {
    active();
    if ($(window).width() > 767) {
        $('#gifM').css("display", "none");
        $('#myVideo').css("display", "");
    } else {
        $("section.notification").hide();
        $('#myVideo').css("display", "none");
        var myVideo = document.getElementById("myVideo");
        $(myVideo).trigger("pause");
        $('#gifM').css("display", "");
    }
});

/*打开通知栏*/
function openMenu() {
    $("#header").removeClass("notification_color");
    $('section.chose_btn').addClass('open');
    $('div.x, div.z').addClass('collapse');
    $("section.notification").show();
    $("footer#mobile_transaction_btn").hide();
    setTimeout(function () {
        $('div.x').addClass('rotate30');
        $('div.z').addClass('rotate150');
    }, 70);
    setTimeout(function () {
        $('div.x').addClass('rotate45');
        $('div.z').addClass('rotate135');
    }, 120);
}

/* 关闭通知栏 */
function closeMenu() {
    $("#header").addClass("notification_color");
    $("section.notification").hide();
    if ($(window).width() < 768) {
        $("footer#mobile_transaction_btn").show();
    }
    setTimeout(function () {
        $('section.chose_btn').removeClass('open');
        $('div.x').removeClass('rotate45').addClass('rotate30');
        $('div.z').removeClass('rotate135').addClass('rotate150');
        setTimeout(function () {
            $('div.x').removeClass('rotate30');
            $('div.z').removeClass('rotate150');
        }, 50);
        setTimeout(function () {
            $('div.x, div.z').removeClass('collapse');
        }, 70);
    }, 100);
}

/* 客户端激活导航栏高亮 */
function active() {
    if (window.innerWidth > 768) {
        var hrefSuffix = location.pathname.split("/");
        hrefSuffix = hrefSuffix[hrefSuffix.length - 1].split("_");
        var locations = hrefSuffix[0];
        // 首页导航栏激活颜色
        if (locations === "index") {
            activeColor($("nav.pc_nav ul"), "#fff");
        } else {
            activeColor($("nav.pc_nav ul"), "#000");
        }
    } else {
        activeColor($("nav.mobile_nav ul"), "#fff");
    }
}

/* 导航栏高亮 */
function activeColor(ul, color) {
    ul.find("li").each(function () {
        var a = $(this).find("a:first")[0];
        var linkSuffix = $(a).attr("href").split("/");
        var myLocation = linkSuffix[linkSuffix.length - 2];
        var hrefSuffix = location.pathname.split("/");
        hrefSuffix = hrefSuffix[hrefSuffix.length - 1].split("_");
        var locations = hrefSuffix[0];
        if (myLocation === locations) {
            $(this).children("a").attr("style", "color:" + color + ";");
        } else {
            $(this).children("a").removeAttr("style", "color:" + color + ";");
        }
    });
    var newSuffix = window.location.href;
    var domain = document.domain;
    if (newSuffix === domain || newSuffix === "http://www.seepixel.com/" || newSuffix === "http://localhost:8080/") {
        ul.find("li").eq(0).children("a").attr("style", "color:" + color + ";")
    }
}