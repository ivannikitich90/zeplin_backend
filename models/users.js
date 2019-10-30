'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        role_id: DataTypes.INTEGER,
        status_id: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_img: DataTypes.STRING,
        created_at: DataTypes.DATEONLY,
        updated_at: DataTypes.DATEONLY
        // access_token: DataTypes.STRING
    }, {timestamps: false, underscored: true});
    users.associate = function (models) {
        users.belongsTo(models.roles, {foreignKey: 'role_id'})
        // associations can be defined here
    };
    return users;
};
