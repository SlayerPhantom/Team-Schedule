const { model, Schema } = require('mongoose');

const groupSchema = new Schema({
	creator: String,
	members: [{ id: String, username: String }],
	scheduleid: String,
});

const Group = model('group', groupSchema);

module.exports = Group;
