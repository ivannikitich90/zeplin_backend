'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const defaultCompany = [{
            name: 'Skipped.io', created_at: new Date(),
            updated_at: new Date()
        }];
        return queryInterface.bulkInsert('companies', defaultCompany)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('companies', null, {});
    }
};
