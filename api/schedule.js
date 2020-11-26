const router = require('express').Router();
const Schedule = require('../models/Schedule');
const User = require('../models/User');

const auth = require('../utils/auth');

// returning the schedule
router.get('/getscheduleuser', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const schedule = await Schedule.findById(user.scheduleid);
		return res.json({
			monday: schedule.monday,
			tuesday: schedule.tuesday,
			wednesday: schedule.wednesday,
			thursday: schedule.thursday,
			friday: schedule.friday,
			saturday: schedule.saturday,
			sunday: schedule.sunday,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});
router.post('/getschedulegroup', async (req, res) => {
	try {
		const { id } = req.body;
		const group = await Group.findById(id);
		const schedule = await Schedule.findById(group.scheduleid);
		return res.json({
			monday: schedule.monday,
			tuesday: schedule.tuesday,
			wednesday: schedule.wednesday,
			thursday: schedule.thursday,
			friday: schedule.friday,
			saturday: schedule.saturday,
			sunday: schedule.sunday,
			scheduleid: group.scheduleid,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

// adding a time to the schedule
router.post('/addtimeuser', auth, async (req, res) => {
	try {
		const { start, end, name, day } = req.body;
		const user = await User.findById(req.user.id);
		const schedule = await Schedule.findById(user.scheduleid);
		const time = { start, end, name, day };
		switch (day) {
			case 'monday':
				schedule.monday.push(time);
				break;
			case 'tuesday':
				schedule.tuesday.push(time);
				break;
			case 'wednesday':
				schedule.wednesday.push(time);
				break;
			case 'thursday':
				schedule.thursday.push(time);
				break;
			case 'friday':
				schedule.friday.push(time);
				break;
			case 'saturday':
				schedule.saturday.push(time);
				break;
			case 'sunday':
				schedule.sunday.push(time);
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({ message: 'successfully added time' });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});
router.post('/addtimegroup', auth, async (req, res) => {
	try {
		const { start, end, name, day, id } = req.body;
		const group = await Group.findById(id);
		const schedule = await Schedule.findById(group.scheduleid);
		const time = { start, end, name, day };
		switch (day) {
			case 'monday':
				schedule.monday.push(time);
				break;
			case 'tuesday':
				schedule.tuesday.push(time);
				break;
			case 'wednesday':
				schedule.wednesday.push(time);
				break;
			case 'thursday':
				schedule.thursday.push(time);
				break;
			case 'friday':
				schedule.friday.push(time);
				break;
			case 'saturday':
				schedule.saturday.push(time);
				break;
			case 'sunday':
				schedule.sunday.push(time);
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({ message: 'successfully added time' });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

router.post('/edituserschedule', auth, async (req, res) => {
	try {
		const { start, end, timeid, id, name, day } = req.body;
		console.log(day);
		const schedule = await Schedule.findById(id);
		switch (day) {
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			default:
				return res.json({ errors: 'not a valid day of the week' });
		}
		return res.json({ schedule });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});
router.post('/edituserschedule', async (req, res) => {
	try {
		const { start, end, timeid, id, name, day } = req.body;
		console.log(day);
		const schedule = await Schedule.findById(id);
		switch (day) {
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter((time) => {
					if (time._id == timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			default:
				return res.json({ errors: 'not a valid day of the week' });
		}
		return res.json({ schedule });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

// deleting a time in a schedule
router.post('/removetimeuser', auth, async (req, res) => {
	try {
		const { day, timeid } = req.body;
		const user = await User.findById(req.user.id);
		const schedule = await Schedule.findById(user.scheduleid);
		switch (day) {
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		return res.json({
			message: `successfully removed time`,
			schedule,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});
router.post('/removetimegroup', auth, async (req, res) => {
	try {
		const { day, timeid, id } = req.body;
		const schedule = await Schedule.findById(id);
		switch (day) {
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter(
					(time) => time._id != timeid
				);
				await schedule.save();
				break;
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => time._id != timeid);
				await schedule.save();
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		return res.json({
			message: `successfully removed time`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
