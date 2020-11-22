const jwt = require('jsonwebtoken');

function createLoginToken(id, username) {
	const token = jwt.sign(
		{
			id,
			username,
		},
		process.env.SECRET_KEY,
		{ expiresIn: '1h' }
	);

	return token;
}

function createVerificationToken(id) {
	const token = jwt.sign({ id }, process.env.SECRET_KEY);
	return token;
}

module.exports = { createLoginToken, createVerificationToken };
