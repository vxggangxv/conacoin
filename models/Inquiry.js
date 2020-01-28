const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Inquiry = sequelize.define(
        'Inquiry', // 테이블 이름
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING
            },
            title: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 20],
                },
            },
            description: {
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
                // defaultValue: sequelize.literal('NOW()')
            }
        }, {
            tableName: 'Inquiry',
        },
    );

    Inquiry.prototype.dateFormat = date => moment(date).format('YYYY-MM-DD');
    // 제품 모델 관계도
    Inquiry.associate = models => {
        // 댓글 모델에 외부키를 건다
        Inquiry.hasMany(models.InquiryReply, {
            as: 'Reply',
            foreignKey: 'product_id',
            sourceKey: 'id',
        });
    }

    return Inquiry;
};