const Repository = require('./repository');

class CartsRepository extends Repository{
    
	// Request to get all items stored in the database
    async getAll() {
        
        const getAllQuery = `SELECT ${this.sqlArguments} FROM ${this.table}`;
        
		// Request all existing carts stored in the database
		const queryPromise = () => {
			return new Promise((resolve, reject) =>{
				this.dbConnection.query(getAllQuery, (err, result, fields) => {
					if(err) return reject(err);
					console.log(result);
					return resolve(result);
				});
			});
		};
        
		// To avoid undefined errors. Assign empty containers
        const carts = []; 
        let records = {};
		records = await queryPromise();
        
		// parse carts stored in database into usable 
        const formatRecords = () => {
            for(let record of records){
                let fRecord = {}
                fRecord.items = JSON.parse(record.items);
                fRecord.id = record.id;
                carts.push(fRecord);
            }
        }

        formatRecords();
		console.log('GETING ALL#################');

		console.log(records);
		return carts;
		
	}

	// Override function from parent and modify behavior by stringifying items.
	async writeAll(records) {

		const writeAllQuery = `REPLACE INTO ${this.table} (${this.sqlArguments}) VALUES ?`;

    
        const valuesArray = [];
		// Format records to a compatible format that is readable for other functions and sql queries
		const formatedRecords = () => {
            
			for (let record of records){
                let recordValues = [];
                recordValues.push(JSON.stringify(record.items));
                recordValues.push(record.id);
                valuesArray.push(recordValues);
			}
			console.log(valuesArray);
		}

		// Insert multiple values into the database and return its status
		const queryPromise = () => {
            return new Promise((resolve, reject) =>{
                this.dbConnection.query(writeAllQuery, [valuesArray], (err, result) => {
					if(err) return reject(err);
					return resolve(result);
				});
			});
		};
        
        formatedRecords();
        let queryResult = {};

		console.log('#########')
		try{
			queryResult = await queryPromise();
			console.log(queryResult);
			console.log('WRITING ALL #################');
		}catch(err){    
			console.log(err);
		}
	}
}

module.exports = new CartsRepository('Carts', 'items, id'); 