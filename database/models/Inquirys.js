const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Inquirys = sequelize.define(
        'Inquirys', // 테이블 이름
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
                // defaultValue: sequelize.literal('NOW()')
            }
        }, {
            tableName: 'Inquirys',
        },
    );

    Inquirys.prototype.dateFormat = date => moment(date).format('YYYY-MM-DD');
    // 제품 모델 관계도
    Inquirys.associate = models => {
        // 댓글 모델에 외부키를 건다
        Inquirys.hasMany(models.InquirysReply, {
            as: 'Reply',
            foreignKey: 'inquiry_id',
            sourceKey: 'id',
        });
    }

    return Inquirys;
};