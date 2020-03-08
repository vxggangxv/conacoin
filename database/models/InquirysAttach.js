const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const InquirysAttach = sequelize.define(
        'InquirysAttach', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            originalname: {
                type: DataTypes.STRING
            },
            filename: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 50]
                }
            },
            size: {
                type: DataTypes.BIGINT
            },
            destination: {
                type: DataTypes.STRING
            },
            extension: {
                type: DataTypes.STRING
            },
            del_status: {
                type: DataTypes.STRING(1),
                defaultValue: 'N',
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            tableName: 'InquirysAttach'
        }
    );

    InquirysAttach.associate = function (models) {
        InquirysAttach.belongsTo(models.Inquirys, {
            foreignKey: 'inquiry_id'
        });
    };

    return InquirysAttach;
};