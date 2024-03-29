const {check} = require('express-validator');
const usersRepo = require('../../repository/users');

//custom validators need to respond with promises otherwise invalid values will be returned
module.exports = {
    // Require a title
    requireTitle: check('title')
    .trim()
    .isLength()
    .withMessage('Must be between 5 and 40 characters')
    ,

    // Require a price
    requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage('Must be a number greater than 1')
    ,
    
    // require a nonregistered email on signup
    requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {

        // 
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
            throw new Error('Email in use');
        }

    }),

    // require a password
    requirePassword: check('password')
    .trim()
    .isLength({min: 4, max:20})
    .withMessage('Must be between 4 and 20 characters'),

    // on signup require a password length between 3 and 20
    requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Must be between 4 and 20 chatacters')
    .custom(async (passwordConfirmation, {req}) => {
        if(passwordConfirmation !== req.body.password){
            throw new Error('Passwords must match');
        }
    }),

    // On signin make sure the the provided email exists 
    requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async email => {
    
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
            throw new Error('Email not found!');
        }
    }), 

    // On signin make sure the provided password is valid
    requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, {req}) => {
        const user = await usersRepo.getOneBy({email: req.body.email})
        
        if(!user){
            throw new Error('Invalid password');
        }

        const validPassword = await usersRepo.comparePasswords(
            user.password,
            password
        );
        if (!validPassword) {
            throw new Error('invalid password');
        } 
    })

}