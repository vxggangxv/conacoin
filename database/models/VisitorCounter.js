module.exports = (sequelize, DataTypes) => {
    const VisitorCounter = sequelize.define(
        'VisitorCounter', // 테이블 이름
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                required: true
            },
            totalCount: {
                type: DataTypes.BIGINT.UNSIGNED,
                required: true
            },
            todayCount: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            date: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            tableName: 'VisitorCounter'
        }
    );

    return VisitorCounter;
};