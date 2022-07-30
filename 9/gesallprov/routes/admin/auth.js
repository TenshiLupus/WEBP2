const express = require('express');
const {check, validationResult} = require('express-validator');

const usersRepo = require('../../repository/users');
const signupTemplate = require('../../views/admin/authentication/signup');
const signInTemplate = require('../../views/admin/authentication/signin');
const { 
    requireEmail, 
    requirePassword, 
    requirePasswordConfirmation,
    requireEmailExists,
    requireValidPasswordForUser 
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({req}));
});

router.post('/signup', 
    [requireEmail, requirePassword, requirePasswordConfirmation]
    , 
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors);

        if(!errors.isEmpty()){
            return res.send(signupTemplate({req, errors }));
        }

        const { email, password, passwordConfirmation } = req.body;

        // Create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password });
        
        // Store the id of that user inside the users cookie
        req.session.userId = user.id;

        res.send('Account created!!!');
    }
);

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

// requests the sign in template page to render
router.get('/signin', (req, res) => {
    // passing in an empty object to avoid errors
    res.send(signInTemplate({}));
});

router.post('/signin', [requireEmailExists, requireValidPasswordForUser], 
async (req, res) => { 
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()){
        return res.send(signInTemplate({errors}));
    }

    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.send('You are signed in!!!');
});

module.exports = router;