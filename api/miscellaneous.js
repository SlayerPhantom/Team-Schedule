const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/confirmEmail/:token', async (req, res) => {
	try {
		const token = req.params.token;
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.id);
		if (!user) return res.status(401).json('user is not valid');
		user.isVerified = true;
		await user.save();
		return res.status(201).json('user is verified');
	} catch (error) {
		console.error(error);
		return res.status(500).json('internal server error');
	}
});

module.exports = router;
