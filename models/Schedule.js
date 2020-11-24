const { model, Schema } = require('mongoose');

const scheduleSchema = new Schema({
	monday: [{ start: String, end: String, name: String }],
	tuesday: [{ start: String, end: String, name: String }],
	wednesday: [{ start: String, end: String, name: String }],
	thursday: [{ start: String, end: String, name: String }],
	friday: [{ start: String, end: String, name: String }],
	saturday: [{ start: String, end: String, name: String }],
	sunday: [{ start: String, end: String, name: String }],
});

const Schedule = model('schedule', scheduleSchema);

module.exports = Schedule;
