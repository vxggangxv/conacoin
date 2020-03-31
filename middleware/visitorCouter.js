module.exports = function (req, res, next) {
    console.log('작동 확인');
    // console.log('cookies: ' + req.cookies);
    // console.log('connect.sid: ' + req.cookies['connect.sid']);
    console.log(req.cookies);
    // if (!req.cookies.count && req.cookies['connect.sid']) {
    //     res.cookie('count', '', {
    //         maxAge: 3600000,
    //         httpOnly: true
    //     });
    //     var now = new Date();
    //     var date = now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate();
    //     if (date != req.cookies.countDate) {
    //         res.cookie('countDate', date, {
    //             maxAge: 86400000,
    //             httpOnly: true
    //         });

    //         let totalCount = 1;
    //         let todayCount = 1;

    //         // 방문자 여부 확인 (total 기준)
    //         const counter = db.VisitorCounter.findOne({
    //             where: {
    //                 name: 'vistors'
    //             }
    //         });
    //         console.log(counter);
    //         // 첫 방문자 생성
    //         if (!counter) {
    //             db.VisitorCounter.create({
    //                 name: 'vistors',
    //                 totalCount,
    //                 todayCount,
    //                 date: date
    //             });
    //         } else {
    //             // 방문자 토탈 카운트 추가
    //             totalCount++;
    //             db.VisitorCounter.update({
    //                 totalCount
    //             });
    //             // 방문자 오늘 카운트 추가
    //             if (date == counter.date) {
    //                 todayCount++;
    //                 db.VisitorCounter.update({
    //                     todayCount
    //                 });
    //             } else {
    //                 // 날짜가 다를 경우
    //                 todayCount = 1;
    //                 db.VisitorCounter.create({
    //                     name: 'vistors',
    //                     totalCount,
    //                     todayCount,
    //                     date
    //                 });
    //             }

    //         }
    //     }
    // }
    return next();
};