const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendPasswordMail } = require('../utils/mail');
const User = require('../models/User');

router.get('/confirmEmail/:token', async (req, res) => {
	try {
		const token = req.params.token;
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.id);
		if (!user) return res.json({ errors: 'user is not valid' });
		user.isVerified = true;
		await user.save();
		res.redirect('https://scheduler9.herokuapp.com/');
	} catch (errors) {
		console.error(errors);
		return res.json({ errors });
	}
});

router.post('/resetpassword/:token', async (req, res) => {
	try {
		const token = req.params.token;
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.id);
		if (!user) return res.json({ errors: 'user is not valid' });
		const { password, confirmPassword } = req.body;
		if (password !== confirmPassword)
			return res.json({ errors: 'passwords must match' });
		user.password = await bcrypt.hash(password, 12);
		await user.save();
		return res.json({ message: 'successfully updated password' });
	} catch (error) {
		return res.json({ errors: error });
	}
});

router.post('/forgotpassword', async (req, res) => {
	try {
		const { email } = req.body;
		const error = sendPasswordMail(email);
		return res.json({ message: 'password reset email has been sent' });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
