const fs = require('fs');
const crypto = require('crypto');
const util = require('util');


const mysql = require('mysql');

const dbConnection = mysql.createConnection({
	host: "atlas.dsv.su.se",
	user: "usr_21114200",
	password: "114200",
	database: "db_21114200"
});

dbConnection.connect(err => {
		if (err) throw err;

		console.log('connected');

	}
);



module.exports = class Repository {
    constructor(table) {
        if (!table) {
          throw new Error('Creating a repository requires a filename');
        }
    
        this.table = table;
       
        try {
          ;
        } catch (err) {
          fs.writeFileSync(this.filename, '[]');
        }
      }
    
      async getAll() {
        return JSON.parse(
          await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
          })
        );
      }

      async writeAll(records) {
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(records, null, 2)
        );
      }
    
      randomId() {
        return crypto.randomBytes(4).toString('hex');
      }
    
      async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
      }
    
      async create(attributes){
        attributes.id = this.randomId();

        const records = await this.getAll();
        records.push(attributes);
        await this.writeAll(records);
         
        return attributes;
      }

      async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
      }
    
      async update(id, attributes) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
    
        if (!record) {
          throw new Error(`Record with id ${id} not found`);
        }
    
        Object.assign(record, attributes);
        await this.writeAll(records);
      }
    
      async getOneBy(filters) {
        const records = await this.getAll();
    
        for (let record of records) {
          let found = true;
    
          for (let key in filters) {
            if (record[key] !== filters[key]) {
              found = false;
            }
          }
    
          if (found) {
            return record;
          }
        }
      }
}