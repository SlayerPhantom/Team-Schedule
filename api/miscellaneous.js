const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/confirmEmail/:token', async (req, res) => {
	try {
		const token = req.params.token;
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.id);
		if (!user) return res.json({ errors: 'user is not valid' });
		user.isVerified = true;
		await user.save();
		return res.json({ message: 'user is verified' });
	} catch (errors) {
		console.error(errors);
		return res.json({ errors });
	}
});

module.exports = router;
