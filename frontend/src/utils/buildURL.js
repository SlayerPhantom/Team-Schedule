const buildURL = (path) => {
	// return `http://localhost:5000/${path}`;
	return `https://scheduler9.herokuapp.com/${path}`;
};

module.exports = buildURL;
