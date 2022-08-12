const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

//PASSWORD cryptographer middleware, allows for a more solid handling of password verification.
const scrypt = util.promisify(crypto.scrypt);


class UsersRepository extends Repository{
	
	// Create an user 
	async create(attributes) {
		attributes.id = this.randomId();

		// Encrypt password sent in the request body
		const salt = crypto.randomBytes(8).toString('hex');
		const buf = await scrypt(attributes.password, salt, 64);

		const records = await this.getAll();
		const record = {
			...attributes,
			password: `${buf.toString('hex')}.${salt}`
		};
		records.push(record);

		await this.writeAll(records);

		return record;
	}

	// Unencrypt the password from the corresponding record and assert whether it is the same as the one in the request body
	async comparePasswords(saved, supplied){
        // Save -> password saved in our database. 'hashed.salt'
        // Supplied -> password given to us by a user trying to sign in.
        const [hashedPassword, salt] = saved.split('.');
        const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);
    
        return hashedPassword === hashedSuppliedBuffer.toString('hex');
    
      }
}

module.exports = new UsersRepository('Users', 'email, password, id');
