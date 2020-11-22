const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { createVerificationToken } = require('./jwt');
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
			url = `https://group9-meetingscheduler.herokuapp.com/api/miscellaneous/confirmEmail/${token}`;
		else url = `http://localhost:5000/api/miscellaneous/confirmEmail/${token}`;
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

module.exports = sendVerificationMail;
