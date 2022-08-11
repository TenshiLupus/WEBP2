const Repository = require('./repository');

class ProductsRepository extends Repository{
    async writeAll(records) {

		const writeAllQuery = `REPLACE INTO ${this.table}(${this.sqlArguments}) VALUES ?`;

		const valuesArray = []
		const formatedRecords = () => {
			JSON.stringify(records.items);
            valuesArray.push()
			console.log('RECORDS' + records);
		}
		formatedRecords();
		let queryResult = {};
		console.log(valuesArray);

		const queryPromise = () => {
			return new Promise((resolve, reject) =>{
				this.dbConnection.query(writeAllQuery, [valuesArray], (err, result) => {
					if(err) return reject(err);
					return resolve(result);
				});
			});
		};

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

module.exports = new ProductsRepository('Products', 'title, price, image, id');