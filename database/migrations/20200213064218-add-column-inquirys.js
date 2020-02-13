'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Inquirys', 'attach_cnt', Sequelize.BIGINT.UNSIGNED);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Inquirys', 'attach_cnt', Sequelize.BIGINT.UNSIGNED);
    }
};