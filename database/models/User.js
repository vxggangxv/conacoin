const passwordHash = require('../../helpers/passwordHash');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 50]
            },
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 100]
            },
            allowNull: false
        },

        displayname: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },

    }, {
        tableName: 'User',
        // hooks: {
        //     beforeCreate: (user, _) => {
        //         user.password = passwordHash(user.password);
        //     },
        //     beforeUpdate: (user, _) => {
        //         user.password = passwordHash(user.password);
        //     }
        // }
    });

    User.beforeCreate((user, _) => {
        user.password = passwordHash(user.password);
    });
    User.beforeUpdate((user, _) => {
        user.password = passwordHash(user.password);
    });

    return User;
}