const buildURL = (path) => {
	// if (NODE_ENV === 'production')
	// return `https://scheduler9.herokuapp.com/${path}`;
	return `http://localhost:5000/${path}`;
};

module.exports = buildURL;
