'use strict';
module.exports = (sequelize, DataTypes) => {
    const companies = sequelize.define('companies', {
        name: DataTypes.STRING
    }, {underscored: true});
    companies.associate = function (models) {
        // associations can be defined here
    };
    return companies;
};
