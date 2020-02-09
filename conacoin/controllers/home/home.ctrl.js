const models = require('../../database/models');


exports.index = async (req, res) => {
    try {
        const [inquirys, news] = await Promise.all([
            models.Inquirys.findAll({
                limit: 20,
                offset: 0,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.News.findAll({
                limit: 20,
                offset: 0,
                order: [
                    ['createdAt', 'desc']
                ]
            })
        ]);

        inquirys.forEach(item => {
            item.name = item.name.substr(0, 1) + '****';
            console.log(item);
        });

        res.render('home.html', {
            inquirys,
            news,
        });
    } catch (e) {
        console.log(e);
    }
}