'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_statuses = sequelize.define('users_statuses', {
    name: DataTypes.STRING
  }, {});
  users_statuses.associate = function(models) {
    // associations can be defined here
  };
  return users_statuses;
};