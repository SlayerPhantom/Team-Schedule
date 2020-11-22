const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	password: String,
});

const User = model('user', userSchema);

module.exports = User;
