const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const InquiryReply = sequelize.define(
        'InquiryReply', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 500],
                },
            },
        }, {
            tableName: 'InquiryReply',
        },
    );

    // 년-월-일
    InquiryReply.prototype.dateFormat = date =>
        moment(date).format('YYYY-MM-DD // h:mm');

    InquiryReply.associate = function (models) {
        InquiryReply.belongsTo(models.Inquiry, {
            foreignKey: 'product_id',
        });
    };

    return InquiryReply;
};