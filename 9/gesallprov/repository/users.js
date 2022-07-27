const fs = require('fs');
const crypto = require('crypto')


class UsersRepository {
    constructor (filename){
        if(!filename){
            throw new Error('creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll(){

        // open the file called this.filename
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }

    async create(attributes){
        attributes.id = this.randomID();
        const records = await this.getAll();
        records.push(attributes)
        // write the updated records array back to this.filename

        await this.writeAll(records);

        return attributes;
    }

    async writeAll(records){
        await fs.promises.writeFile(
        this.filename,
        JSON.stringify(records, null, 4)
        );
    }

    randomID(){
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id){
        const records = await this.getAll();
        return records.find(record => record.id === id );
    };

    async delete(id){
        const records = await this.getAll();
        const filteredRecords = records.filter(records =>{
            records.id !== id;
        });
        await this.writeAll(filteredRecords);
    }

    async update(id, attributes){
        const records = await this.getAll();
        const record = records.find( record => {
            record.id === id;
        });

        if (!record) {
            throw new Error(`Record with id ${id} not found`);       
        }

        Object.assign(record, attributes);
        await this.writeAll(records);
    }

    async getOneBy(filters){
        const records = await this.getAll();

        let found = true; 
        for(let record of records){

            for (let key in filters){
                if (record[key] !== filters[key]){
                    found = false;
                }
            }

            if(found){
                return record;
            }
            
        }

    }
}

module.exports = new UsersRepository('users.json');
