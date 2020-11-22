const User = require('../models/User');
const router = require('express').Router();

router.post('/register', async function (req, res) {
	try {
		const { username, password } = req.body;
		await User.create({ username, password });
		res.json({ success: 'new user created' });
	} catch (error) {
		console.error(error);
	}
});

router.post('/login', async function (req, res) {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user) return res.json({ id: user._id, username });
		res.json({ error: 'no such user exists' });
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
