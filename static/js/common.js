$(document).on('click', '.add_like', function (e) {
    // 주소에 # 붙는것 방지
    e.preventDefault();

    // 부모 요소의 아이디를 가져온다.
    var target_id = $(this).parent().attr('id');

    // 현재 제품의 id 받아옴
    var product_id = $(this).attr('product_id');

    $.ajax({
            url: '/products/like/' + product_id,
            type: 'post',
        })
        .done(function () {

            $('#' + target_id).html('\
            <a product_id="' + product_id + '" class="pull-right remove_like" href="#"> \
                <img src="/static/img/likeon.png" width="20" alt=""> \
            </a> \
        ');

        })
        .fail(function () {
            console.log('오류발생');
        })


});

$(document).on('click', '.remove_like', function (e) {
    // 주소에 # 붙는것 방지
    e.preventDefault();

    // 부모 요소의 아이디를 가져온다.
    var target_id = $(this).parent().attr('id');

    // 현재 제품의 id 받아옴
    var product_id = $(this).attr('product_id');

    $.ajax({
            url: '/products/like/' + product_id,
            type: 'delete',
        })
        .done(function () {

            $('#' + target_id).html('\
            <a product_id="' + product_id + '" class="pull-right add_like" href="#"> \
                <img src="/static/img/likeoff.png" width="20" alt=""> \
            </a> \
        ');

        })
        .fail(function () {
            console.log('오류발생');
        })


});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(unescape(document.cookie));
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookieHour(name, value, hours) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000 * hours;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + now.toUTCString() + ";"
}