$(function () {
    dropselectFn();
    fileformFn();
    allCheck();
});

function dropselectFn() {
    // 드롭메뉴(셀렉트 연결)
    $('body').on('click', '.dropbtn[data-toggle=dropmenu]', function () {
        $(this)
            .closest('.dropselect')
            .find('.dropmenu')
            .toggleClass('active');
    });
    $('body').on('click', '.dropselect .dropmenu li', function () {
        var idx = $(this).index();
        var txt = $(this).text();
        $(this)
            .closest('.dropselect')
            .find('select option')
            .eq(idx)
            .prop('selected', true)
            .siblings()
            .prop('selected', false);
        $(this)
            .closest('.dropselect')
            .find('.drop-toggle .in')
            .text(txt);
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
        $(this)
            .closest('.dropmenu')
            .removeClass('active');
        if ($(this).closest('form')) {
            $(this).closest('form').submit();
        }
    });
}

function fileformFn() {
    var fileSize = 5;
    var fileLength = 5;
    $('body').on('click', '.fileform', function () {
        fileSize = $(this).attr('data-file-size') || 5;
        fileLength = $(this).attr('data-file-length') || 5;
    });
    $('body').on('change', '.fileform', function () {
        var files = this.files;
        var limitSize = fileSize * 1024 * 1024;
        var $filename = $(this).closest('.fileform-wrapper').find('.filename');
        if (files[0] == undefined) {
            $filename.text('선택된 파일없음');
            return;
        }
        // for (var n in files) {
        //     console.log(files[n].size);
        //     if (files[n].size > limitSize) return alert('파일크기가 10MB 보다 작아야합니다.')
        // }
        for (var i = 0; i < files.length; i++) {
            // console.log(files[i].size);
            var alertText = '파일크기가 ' + fileSize + 'MB 보다 작아야합니다.';
            if (files[i].size > limitSize) return alert(alertText);
        }
        if (files.length > 1 && files.length < fileLength + 1) {
            $filename.text(files.length + '개 파일');
            return;
        } else if (files.length >= fileLength + 1) {
            alert('최대 5개까지 가능합니다.');
            return;
        }
        $filename.text(files[0].name);
    });
    var $deleteBtn = $('.fileform-wrapper .delete-btn');
    $deleteBtn.on('click', function () {
        var $filename = $(this).closest('.fileform-wrapper').find('.filename');
        // console.log($('.fileform')[0].files);
        if ($('.fileform')[0].files.length) {
            $('.fileform').val('');
            // console.log($('.fileform')[0].files);
            $filename.text('선택된 파일 없음');
        }
    });
}

function imgformFn() {
    var $imgForm = $('#imgForm');
    var $imgList = $('#imgList');
    var selectFiles = [];
    $imgForm.on('change', function (e) {
        // console.log($(this)[0].files);
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        console.log(filesArr);
        filesArr.forEach(function (item) {
            // if (!item.type.match('image.*')) {
            //     alert('이미지 파일을 업로드해주세요.')
            //     return;
            // }
            $imgList.empty();
            var reader = new FileReader();
            reader.onload = function (e) {
                var $html = '\
                            <a href="javascript:;" class="item">' +
                    '<img src="' + e.target.result + '" alt="상품">' +
                    '<span class="x">&times;</span>' +
                    '</a>';

                $imgList.append($html);
            };

            reader.readAsDataURL(item);
        });
    });
    $('body').on('click', '#imgList .item', function () {
        // console.log($imgForm);
        // var idx = $(this).index();
        console.log($imgForm[0].files);
        $imgForm.val('');
        $imgList.empty();
        console.log($imgForm[0].files);
    });
}

function content_br2n(obj) {
    var content = $(obj).val().trim().replace(/(?:\r\n|\r|\n)/g, '<br/>');
    return $(obj).val(content);
}

function content_n2br(content) {
    return content.replace(/<br\s*\/?>/mg, '\n');
}

function getCookie(cname) {
    var name = cname + '=';
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
    return '';
}

function setCookieHour(name, value, hours) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000 * hours;
    now.setTime(time);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + now.toUTCString() + ';';
}

// 달력 ui
function datePick() {
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });
    $('input.date-ui').datepicker({
        // minDate: 0,
        dateFormat: 'yy-mm-dd'
    });
}

// 모두 동의
function allCheck() {
    $('.check-all').click(function () {
        var checkName = $(this).attr('data-check-name');
        $('.check-item[data-check-name="' + checkName + '"]').prop('checked', this.checked);
    });
}