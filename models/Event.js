const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
	creator: String,
	name: String,
	start: String,
	end: String,
	members: [{ id: String, username: String }],
});

const Event = model('event', eventSchema);

module.exports = Event;
