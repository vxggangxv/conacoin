module.exports = (sequelize, DataTypes) => {
    const VisitorTotal = sequelize.define(
        'VisitorTotal', // 테이블 이름
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
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        }, {
            tableName: 'VisitorTotal'
        }
    );

    return VisitorTotal;
};