'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'Admin',
            },
            {
                name: 'Recruiter',
            },
            {
                name: 'Candidate'
            }
        ])

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
