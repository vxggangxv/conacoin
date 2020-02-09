$(function () {
    datePick();
    allChk();
});

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
    $("input.date-ui").datepicker({
        // minDate: 0,
        dateFormat: 'yy-mm-dd'
    });
}

function allChk() {
    $('.check-all').click(function () {
        var checkName = $(this).attr('data-check-name');
        $('.check-item[data-check-name="' + checkName + '"]').prop('checked', this.checked);
    });
}