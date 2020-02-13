$(function () {
    dropselectFn();
    fileformFn();
});

function dropselectFn() {
    // 드롭메뉴(셀렉트 연결)
    $('.dropbtn[data-toggle=dropmenu]').on('click', function () {
        $(this)
            .closest('.dropselect')
            .find('.dropmenu')
            .toggleClass('active');
    });
    $('.dropselect .dropmenu li').on('click', function () {
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
    $('.fileform').on('change', function () {
        var files = this.files;
        var limitSize = 10 * 1024 * 1024;
        var $filename = $('.fileform-wrapper .filename');
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
            if (files[i].size > limitSize) return alert('파일크기가 10MB 보다 작아야합니다.')
        }
        if (files.length > 1 && files.length < 6) {
            $filename.text(files.length + '개 파일');
            return;
        } else if (files.length >= 6) {
            alert('최대 5개까지 가능합니다.')
            return;
        }
        $filename.text(files[0].name);
    });
}