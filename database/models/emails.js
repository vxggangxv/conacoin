module.exports = (sequelize, DataTypes) => {
    const Emails = sequelize.define(
        'Emails', // 테이블 이름
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            gmail_cnt: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            gmail_date: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            tableName: 'Emails'
        }
    );

    return Emails;
};