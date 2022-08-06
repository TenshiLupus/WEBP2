
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION ESTABLISHED');
    }).catch(err => {
        console.log(err);
    });

// database connection
const adminUserSchema = new mongoose.Schema({
    email : String,
    password: String,
    _id : String
});
class DatabaseHandler {
    constructor(){
        
    }

    createNewAdmin(newAdmin){
        const Admin = mongoose.model('Admin', adminUserSchema);
        const newAdminCollection = new Admin(newAdmin.email, newAdmin.password, newAdmin.id);
    }
    

}

module.exports = new DatabaseHandler();
