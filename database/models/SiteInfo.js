const passwordHash = require('../../helpers/passwordHash');

module.exports = function (sequelize, DataTypes) {
    const SiteInfo = sequelize.define('SiteInfo', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        company: {
            type: DataTypes.STRING,
        },
        rep: {
            type: DataTypes.STRING,
        },
        rep_number: {
            type: DataTypes.STRING,
        },
        business_number: {
            type: DataTypes.STRING,
        },
        business_link: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        mailorder: {
            type: DataTypes.STRING,
        },

    }, {
        tableName: 'SiteInfo',
    });

    return SiteInfo;
}