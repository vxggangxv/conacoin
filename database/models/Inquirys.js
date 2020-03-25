const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Inquirys = sequelize.define(
        'Inquirys', // 테이블 이름
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
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: [3, 100]
                },
                allowNull: false
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
            lock_int: {
                type: DataTypes.BIGINT.UNSIGNED,
                defaultValue: '0'
            },
            reply_cnt: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            attach_cnt: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
                // defaultValue: sequelize.literal('NOW()')
            }
        }, {
            tableName: 'Inquirys'
        }
    );

    Inquirys.prototype.dateFormat = date => moment(date).format('YYYY-MM-DD');
    // 제품 모델 관계도
    Inquirys.associate = models => {
        // 댓글 모델에 외부키를 건다
        Inquirys.hasMany(models.InquirysReply, {
            as: 'Reply',
            foreignKey: 'inquiry_id',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        Inquirys.hasMany(models.InquirysAttach, {
            as: 'Attach',
            foreignKey: 'inquiry_id',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });
    };

    return Inquirys;
};