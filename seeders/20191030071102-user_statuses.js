'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users_statuses', [
            {
                'name': 'active',

            },
            {
                'name': 'inactive',

            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users_statuses', null, {});
    }
};
