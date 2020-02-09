const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const News = sequelize.define(
        'News', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 50]
                },
            },
            date: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 50],
                },
            },
            title: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 300],
                },
            },
            link: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 3000],
                },
            },
            content: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 3000],
                },
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        }, {
            tableName: 'News',
        },
    );

    // 년-월-일
    News.prototype.dateFormat = date =>
        moment(date).format('YYYY-MM-DD');

    return News;
};