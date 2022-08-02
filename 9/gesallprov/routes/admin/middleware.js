const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunction) {
        return (req, res, next) => {
            const error = validationResult(req);
            if (!errors.isEmpty()) {


                next();
            }
        };
    }
};
