const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFucntion) {
        return (req, res, next) => {
            const error = validationResult(req);
            if (!errors.isEmpty()) {


                next();
            }
        };
    }
};
