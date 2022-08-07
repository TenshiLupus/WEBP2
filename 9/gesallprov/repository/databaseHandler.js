
const mongoose = require('mongoose');
// database connection

class DatabaseHandler {
    constructor(){
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    }

}

module.exports = DatabaseHandler();
