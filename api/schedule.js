const router = require('express').Router();
const Schedule = require('../models/Schedule');
const User = require('../models/User');
const Group = require('../models/Group');

const auth = require('../utils/auth');
function sortfunction(a, b) {
	return a.start - b.start;
}

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
			case 'sunday':
				schedule.sunday.push(time);
				schedule.sunday = schedule.sunday.sort(sortfunction);
				break;
			case 'monday':
				schedule.monday.push(time);
				schedule.monday = schedule.monday.sort(sortfunction);
				break;
			case 'tuesday':
				schedule.tuesday.push(time);
				schedule.tuesday = schedule.tuesday.sort(sortfunction);
				break;
			case 'wednesday':
				schedule.wednesday.push(time);
				schedule.wednesday = schedule.wednesday.sort(sortfunction);
				break;
			case 'thursday':
				schedule.thursday.push(time);
				schedule.thursday = schedule.thursday.sort(sortfunction);
				break;
			case 'friday':
				schedule.friday.push(time);
				schedule.friday = schedule.friday.sort(sortfunction);
				break;
			case 'saturday':
				schedule.saturday.push(time);
				schedule.saturday = schedule.saturday.sort(sortfunction);
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({ schedule });
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
			case 'sunday':
				schedule.sunday.push(time);
				schedule.sunday = schedule.sunday.sort(sortfunction);
				break;
			case 'monday':
				schedule.monday.push(time);
				schedule.monday = schedule.monday.sort(sortfunction);
				break;
			case 'tuesday':
				schedule.tuesday.push(time);
				schedule.tuesday = schedule.tuesday.sort(sortfunction);
				break;
			case 'wednesday':
				schedule.wednesday.push(time);
				schedule.wednesday = schedule.wednesday.sort(sortfunction);
				break;
			case 'thursday':
				schedule.thursday.push(time);
				schedule.thursday = schedule.thursday.sort(sortfunction);
				break;
			case 'friday':
				schedule.friday.push(time);
				schedule.friday = schedule.friday.sort(sortfunction);
				break;
			case 'saturday':
				schedule.saturday.push(time);
				schedule.saturday = schedule.saturday.sort(sortfunction);
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({ schedule, message: 'successfully added time' });
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
				schedule.sunday = schedule.sunday.sort(sortfunction);
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
				schedule.monday = schedule.monday.sort(sortfunction);
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
				schedule.tuesday = schedule.tuesday.sort(sortfunction);
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
				schedule.wednesday = schedule.wednesday.sort(sortfunction);
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
				schedule.thursday = schedule.thursday.sort(sortfunction);
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
				schedule.friday = schedule.friday.sort(sortfunction);
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
				schedule.saturday = schedule.saturday.sort(sortfunction);
				await schedule.save();
				break;
			default:
				console.log(day);
				return res.json({ errors: 'not a valid day of the week' });
		}
		return res.json({ schedule });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});
router.post('/editgroupschedule', async (req, res) => {
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
				schedule.sunday = schedule.sunday.sort(sortfunction);
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
				schedule.monday = schedule.monday.sort(sortfunction);
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
				schedule.tuesday = schedule.tuesday.sort(sortfunction);
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
				schedule.wednesday = schedule.wednesday.sort(sortfunction);
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
				schedule.thursday = schedule.thursday.sort(sortfunction);
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
				schedule.friday = schedule.friday.sort(sortfunction);
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
				schedule.saturday = schedule.saturday.sort(sortfunction);
				await schedule.save();
				break;
			default:
				console.log(day);
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
				console.log(day);
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
				console.log(day);
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

router.get('/getuserassociatedschedule', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const userschedule = await Schedule.findById(user.scheduleid);
		const groupschedules = [];
		const groups = user.groups;
		let functions = groups.map((group) => Group.findById(group.id));
		const groupmodels = await Promise.all(functions);
		functions = groupmodels.map((group) => Schedule.findById(group.scheduleid));
		const schedulemodels = await Promise.all(functions);
		schedulemodels.forEach((model) => groupschedules.push(model));
		let monday = [...userschedule.monday];
		let tuesday = [...userschedule.tuesday];
		let wednesday = [...userschedule.wednesday];
		let thursday = [...userschedule.thursday];
		let friday = [...userschedule.friday];
		let saturday = [...userschedule.saturday];
		let sunday = [...userschedule.sunday];
		groupschedules.forEach((group) => monday.push(...group.monday));
		groupschedules.forEach((group) => tuesday.push(...group.tuesday));
		groupschedules.forEach((group) => wednesday.push(...group.wednesday));
		groupschedules.forEach((group) => thursday.push(...group.thursday));
		groupschedules.forEach((group) => friday.push(...group.friday));
		groupschedules.forEach((group) => saturday.push(...group.saturday));
		groupschedules.forEach((group) => sunday.push(...group.sunday));
		monday = monday.sort(function (a, b) {
			return a.start - b.start;
		});
		tuesday = tuesday.sort(function (a, b) {
			return a.start - b.start;
		});
		wednesday = wednesday.sort(function (a, b) {
			return a.start - b.start;
		});
		thursday = thursday.sort(function (a, b) {
			return a.start - b.start;
		});
		friday = friday.sort(function (a, b) {
			return a.start - b.start;
		});
		saturday = saturday.sort(function (a, b) {
			return a.start - b.start;
		});
		sunday = sunday.sort(function (a, b) {
			return a.start - b.start;
		});
		return res.json({
			schedule: {
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
				sunday,
			},
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
