const express = require('express');
const cors = require('cors');

const path = require('path');
require('dotenv').config({ path: './config.env' });
const connectDB = require('./db');

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});

app.use('/api', require('./api/user'));
app.use('/api/miscellaneous', require('./api/miscellaneous'));
app.use('/api/event', require('/api/event'));
app.set('port', PORT);

// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
