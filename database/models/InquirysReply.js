const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const InquirysReply = sequelize.define(
        'InquirysReply', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 500],
                },
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        }, {
            tableName: 'InquirysReply',
        },
    );

    // 년-월-일
    InquirysReply.prototype.dateFormat = date =>
        moment(date).format('YYYY-MM-DD // h:mm');

    InquirysReply.associate = function (models) {
        InquirysReply.belongsTo(models.Inquirys, {
            foreignKey: 'inquiry_id',
        });
    };

    return InquirysReply;
};