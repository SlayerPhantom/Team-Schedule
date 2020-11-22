const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	isVerified: Boolean,
});

const User = model('user', userSchema);

module.exports = User;
