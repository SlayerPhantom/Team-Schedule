const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { createVerificationToken } = require('./jwt');
const User = require('../models/User');

async function sendVerificationMail(userEmail, id) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.MAIL_EMAIL,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		const token = createVerificationToken(id);
		let url;
		if (process.env.NODE_ENV === 'production')
			url = `https://scheduler9.herokuapp.com/api/miscellaneous/confirmemail/${token}`;
		else url = `http://localhost:5000/api/miscellaneous/confirmemail/${token}`;
		await transporter.sendMail({
			to: userEmail,
			from: '"Schedule App email" <cop4331g9fall2020@gmail.com>',
			subject: 'Schedule App Verification Email',
			html: `Click this link to verify your email <a href="${url}">${url}</a>`,
		});
	} catch (error) {
		console.error(error);
		throw new Error('could not send verification email');
	}
}

async function sendPasswordMail(email) {
	try {
		const user = await User.findOne({ email });
		if (!user) return 'user with this email does not exist';
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.MAIL_EMAIL,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		const token = createVerificationToken(user._id);
		let url;
		if (process.env.NODE_ENV === 'production')
			url = `https://scheduler9.herokuapp.com/resetpassword/${token}`;
		else url = `http://localhost:5000/api/miscellaneous/resetpassword/${token}`;
		await transporter.sendMail({
			to: email,
			from: '"Schedule App email" <cop4331g9fall2020@gmail.com>',
			subject: 'Schedule App Reset Password Email',
			html: `Click this link to be redirected to reset password <a href="${url}">${url}</a>`,
		});
		return '';
	} catch (error) {
		console.error(error);
		return { errors: error };
	}
}

module.exports = { sendVerificationMail, sendPasswordMail };
