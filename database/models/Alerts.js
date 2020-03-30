const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Alerts = sequelize.define(
        'Alerts', // 테이블 이름
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 50]
                }
            },
            email: {
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 300]
                }
            },
            content: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 3000]
                }
            },
            attach_cnt: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            tableName: 'Alerts'
        }
    );

    Alerts.prototype.dateFormat = date => moment(date).format('YY.MM.DD');

    return Alerts;
};