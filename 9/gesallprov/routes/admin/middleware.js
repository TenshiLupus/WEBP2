const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunction) {
        return (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {


                next();
            }
        };
    }
};
