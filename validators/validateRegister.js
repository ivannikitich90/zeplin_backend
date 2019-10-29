// Express Validator
const {body} = require('express-validator');
const db = require('../models');
const Users = db.users;
const to = require('../helpers/getPromiseResult');

const rules = [
    body('email').not(). isEmpty().withMessage('E-mail is required').isEmail().withMessage('E-mail is invalid'),
    body('phone', 'Phone is required').not().isEmpty(),
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('password', 'Password is required').not().isEmpty(),
    // body('user_type', 'User type is required').not().isEmpty(),
    // body('field_type')
    //     .custom(async (type, {req}) => {
    //         let data = req.body;
    //         if (data.user_type === 'customer') return true;
    //         else if (!data.field_type) {
    //             throw new Error('Field type is required');
    //         }
    //         return true;
    //     }),
    body().custom(async (req) => {
        let email = req.email;

        // Retrieving a user with request email
        let user = await to(Users.findOne({where: {email: email}}));
        if (user != null) throw new Error('E-mail exists');

        // return true;
    }),


];

module.exports = {
    rules
};
