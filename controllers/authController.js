const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require('../models');
const bcrypt = require('bcryptjs');
const Users = db.users;
const Roles = db.roles;

const showIfErrors = require('../helpers/showIfErrors');


exports.login = async (req, res) => {

    // Checking validation result from express-validator
    if (!showIfErrors(req, res)) {
        // Getting request data and setting user fields to return
        let data = req.body;
        let email = data.email.trim();

        let attributes = [`first_name`, `last_name`, 'email', 'profile_img', 'password', 'id', 'status_id'];

        // Active status selecting
        let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');


        // Selecting an employee that has an email matching request one
        let user = await Users.findOne({
            attributes: attributes,
            include: [{model: Roles, attributes: ['name']}],
            where: {email: email} //userTypeWhere
        }, res);


        if (!res.headersSent) {


            // User is not active
            if (!user) res.status(500).json({msg: 'You don\'t have such privileges or the account is inactive'});

            else {
                // Cloning users object without password and saving user full name
                let {password, ...details} = user.toJSON();
                let full_name = user[`first_name`] + ' ' + user[`last_name`];


                res.status(200).json({
                    token: jwt.sign(details, 'secretkey', {expiresIn: '8h'}), full_name: full_name
                })
            }


        }
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({msg: 'OK'})
};

exports.register = async (req, res) => {
    if (!showIfErrors(req, res)) {
        let data = req.body;

        // Hashing user password to save in db
        let originalPass = data.password;
        data.password = bcrypt.hashSync(originalPass, 10);

        // Getting selected role id
        const role = await Roles.findOne({where: {name: data.role}, attributes: ['id']});
        data.role_id = role.id;
        data.status_id = 1;
        delete data['role'];

        await Users.create(data);

        // Saving the original password again to request for authenticating the user at once
        data.password = originalPass;
        req.body = data;

        this.login(req, res);
    }
};
