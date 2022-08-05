 
// helper function to return error respictive error of input field
module.exports = {
    getError(errors, prop) {
    try{
        return errors.mapped()[prop].msg;
    } catch (err){
        return '';
    }
}
}