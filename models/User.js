const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	groups: [{ id: String, name: String }],
	isVerified: Boolean,
	scheduleid: String,
});

const User = model('user', userSchema);

module.exports = User;
