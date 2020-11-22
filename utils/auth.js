const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.headers.authorization;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			req.user = {};
			req.user.id = decoded.id;
			req.user.username = decoded.username;
			next();
		} catch (error) {
			console.error(error);
			throw new Error('token is not valid');
		}
	} else {
		throw new Error('No token is present. You are unauthenticated');
	}
}

module.exports = auth;
