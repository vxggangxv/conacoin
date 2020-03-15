module.exports = function (sequelize, DataTypes) {
    const OpenBanners = sequelize.define(
        'OpenBanners', {
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
            link: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 3000]
                }
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
            tableName: 'OpenBanners'
        }
    );

    return OpenBanners;
};