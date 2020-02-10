$(function () {
    dropselectFn();
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