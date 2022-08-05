const { validationResult } = require('express-validator');

module.exports = {
    // Error middleware handling errors that may rise in the validation of input
    handleErrors(templateFunction, dataCallback) {
        return async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                let data = {};
                if(dataCallback){
                    data = await dataCallback(req);
                }

                return res.send(templateFunction({errors, ...data}));
            }

            next();
        };
    },
    // if the users is not signed in require them to fisrs sign in
    requireAuth(req,res, next){
        if(!req.session.userId){
            return res.redirect('/signin')
        }

        next()
    }
};
