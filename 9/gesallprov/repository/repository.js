const fs = require('fs');
const crypto = require('crypto');
const util = require('util');


const mysql = require('mysql');

//Connection attributes which to pass to the connectionHandler
const dbConnection = mysql.createConnection({
	host: "atlas.dsv.su.se",
	user: "usr_21114200",
	password: "114200",
	database: "db_21114200"
});

//Request database for a connection
dbConnection.connect(async err => {
	if (err) throw err;
	else console.log('CONNECTED TO DATABASE');
});

module.exports = class Repository {
	constructor(table, sqlArguments) {
		if (!table) {
			throw new Error('"Creating a repository requires a filename"');
		}

		this.table = table;

		this.dbConnection = dbConnection;
		
		this.sqlArguments = sqlArguments;

	}

	queryPromise = (query) => {
		return new Promise((resolve, reject) =>{
			this.dbConnection.query(query, (err, result) => {
				if(err) return reject(err);
				return resolve(result);
			});
		});
	};

	//Read from database
	async getAll() {

		const getAllQuery = `SELECT ${this.sqlArguments} FROM ${this.table}`;

		const queryPromise = () => {
			return new Promise((resolve, reject) =>{
				this.dbConnection.query(getAllQuery, (err, result, fields) => {
					if(err) return reject(err);
					console.log(result);
					return resolve(result);
				});
			});
		};

		let records = {};
		records = await queryPromise();

		console.log('GETING ALL#################');

		console.log('returned' + records);
		return records;
		
	}

	async writeAll(records) {

		const writeAllQuery = `REPLACE INTO ${this.table}(${this.sqlArguments}) VALUES ?`;

		const valuesArray = []
		const formatedRecords = () => {
			for (let record of records){
				valuesArray.push(Object.values(record));
			}
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

	randomId() {
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find(record => record.id === id);
	}

	async create(attributes) {
		const records = await this.getAll();
		attributes.id = this.randomId();
		records.push(attributes)
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