const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = require('express').Router();
const sendVerificationMail = require('../utils/mail');
const { createLoginToken } = require('../utils/jwt');
const auth = require('../utils/auth');

router.post('/register', async (req, res) => {
	try {
		const errors = {};
		let { username, password, email, confirmPassword, fname, lname } = req.body;

		const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (password !== confirmPassword) errors.password = 'passwords must match';
		if (!regex.test(email)) errors.email = 'please provide a valid email';

		if (Object.keys(errors).length !== 0) return res.json(errors);
		const mailExists = await User.findOne({ email });
		if (mailExists) return res.json({ errors: 'email already in use' });

		const usernameExists = await User.findOne({ username });
		if (usernameExists)
			return res.json({ errors: 'username is already taken' });

		password = await bcrypt.hash(password, 12);
		const newUser = new User({
			username: username,
			password: password,
			email: email,
			firstName: fname,
			lastName: lname,
			isVerified: false,
		});
		const user = await newUser.save();
		await sendVerificationMail(email, user._id);
		return res.json({ message: 'Verify Email to Begin' });
	} catch (error) {
		console.error(error);
		return res.json({ error: error });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (user) {
			if (!user.isVerified)
				return res.json({ errors: 'please confirm your email' });
			const match = await bcrypt.compare(password, user.password);
			if (!match) return res.json({ errors: 'wrong credentials' });
			const token = createLoginToken(user._id, user.Username);
			return res.json({ token });
		} else {
			return res.json({ errors: 'no user with this username exists' });
		}
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
