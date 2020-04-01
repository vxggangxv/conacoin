const db = require('../database/models');

module.exports = async function (req, res, next) {
    // console.log('작동 확인: ' + req.cookies);
    // 예외 관리자 path 추가
    if (req.path.indexOf('/conaservice') == -1 && !req.cookies.count && req.cookies['connect.sid']) {
        res.cookie('count', '', {
            maxAge: 1000 * 60 * 60,
            httpOnly: true
        });
        var now = new Date();
        var date = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate());
        var nowHour = now.getHours();
        var nowMinutes = now.getMinutes();
        var nowSeconds = now.getSeconds();
        let name = 'visitors';

        // console.log(date);
        // console.log(req.cookies.countDate);
        // 방문자 여부 확인 (today 기준)
        if (date != req.cookies.countDate) {
            res.cookie('countDate', date, {
                maxAge: 1000 * (60 - nowSeconds) * (60 - nowMinutes) * (24 - nowHour),
                httpOnly: true
            });
            // 방문자 여부 확인 (total 기준)
            const total = await db.VisitorTotal.findOne({
                where: {
                    name
                }
            });

            let totalCount = 1;

            if (!total) {
                db.VisitorTotal.create({
                    name,
                    totalCount
                });
            } else {
                totalCount = total.totalCount;
                totalCount++;
                db.VisitorTotal.update({
                    totalCount
                }, {
                    where: {
                        name
                    }
                });
            }

            const today = await db.VisitorToday.findOne({
                where: {
                    date
                }
            });

            let todayCount = 1;

            if (!today) {
                db.VisitorToday.create({
                    name,
                    todayCount,
                    date
                });
            } else {
                todayCount = today.todayCount;
                todayCount++;
                db.VisitorToday.update({
                    name,
                    todayCount
                }, {
                    where: {
                        date
                    }
                });
            }

            // 테이블 하나로 관리 (today 분리 하지않을 경우)
            // 전체 첫 방문자 생성
            /*
            if (!counter) {
                db.VisitorCounter.create({
                    name,
                    totalCount,
                    todayCount,
                    date
                });
            } else {
                // 방문자 토탈 카운트 추가
                totalCount++;
                // 방문자 오늘 카운트 추가
                if (date == counter.date) {
                    todayCount++;
                    db.VisitorCounter.update({
                        todayCount
                    }, {
                        where: {}
                    });
                } else {
                    // 날짜가 다를 경우
                    todayCount = 1;
                    db.VisitorCounter.update({
                        todayCount,
                        date
                    }, {
                        where: {}
                    });
                }
            }
            */
        }
    }
    return next();
};