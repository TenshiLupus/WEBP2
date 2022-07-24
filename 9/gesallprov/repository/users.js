const fs = require('fs');

class UsersRepository {
    constructor (filename){
        if(!filename){
            throw new Error('creating a repository requires a filename')
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.FileSystem.accessSync(this.filename, '[]');
        }
    }
}

const repo = new UsersRepository('users.json');