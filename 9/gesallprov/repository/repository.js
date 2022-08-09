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

module.exports = class Repository {
	constructor(table) {
		if (!table) {
			throw new Error('Creating a repository requires a filename');
		}

		this.table = table;
	}

	queryPromise = (query) => {
		return new Promise((resolve, reject) =>{
			dbConnection.query(query, (err, result) => {
				if(err) return reject(err);
				return resolve(result);
			});
		});
	};

	//Read from database
	async getAll() {

		const getAllQuery = `SELECT * FROM ${this.table}`;
	
		
		let records = {}
		dbConnection.connect(async err => {
			
			const queryPromise = () => {
				return new Promise((resolve, reject) =>{
					dbConnection.query(getAllQuery, (err, result) => {
						if(err) return reject(err);
						return resolve(result);
					});
				});
			};

			try{

			records = await queryPromise();
			console.log(typeof(queryResult));

			console.log('GETING ALL#################');
			} catch (error){
				console.log(error);
			}
		});
		console.log('returned' + records);
		return records;
	}

	async writeAll(records) {

		const writeAllQuery = `"INSERT INTO ${this.table} (title, price, image, id) VALUES ?"`;

		console.log(records);

		let queryResult = {};
		dbConnection.connect(async err => {

			const queryPromise = () => {
				return new Promise((resolve, reject) =>{
					dbConnection.query(query, records, (err, result) => {
						if(err) return reject(err);
						return resolve(result);
					});
				});
			};

			try{
				queryResult = await queryPromise();
				console.log(queryResult);
				console.log('WRITING ALL #################');
			} catch (err){
				console.log(err);
			}
		});
	}

	randomId() {
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find(record => record.id === id);
	}

	async create(attributes) {
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