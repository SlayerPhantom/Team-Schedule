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

// editing a time in a schedule
// router.post('/edituserschedule', auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.user.id);
// 		const schedule = await Schedule.findById(user.scheduleid);
// 		const { day, start, end, name, newstart, newend, newname } = req.body;
// 		const newtime = { day, start: newstart, end: newend, name: newname };
// 		switch (day) {
// 			case 'monday':
// 				schedule.monday = schedule.monday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.monday.push(newtime);
// 				break;
// 			case 'tuesday':
// 				schedule.tuesday = schedule.tuesday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.tuesday.push(newtime);
// 				break;
// 			case 'wednesday':
// 				schedule.wednesday = schedule.wednesday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.wednesday.push(newtime);
// 				break;
// 			case 'thursday':
// 				schedule.thursday = schedule.thursday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.thursday.push(newtime);
// 				break;
// 			case 'friday':
// 				schedule.friday = schedule.friday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.friday.push(newtime);
// 				break;
// 			case 'saturday':
// 				schedule.saturday = schedule.saturday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.saturday.push(newtime);
// 				break;
// 			case 'sunday':
// 				schedule.sunday = schedule.sunday.filter((time) => {
// 					if (time.start === start && time.end === time.end) return false;
// 					return true;
// 				});
// 				schedule.sunday.push(newtime);
// 				break;
// 			default:
// 				return res.json({ errors: 'not a valid day' });
// 		}
// 		await schedule.save();
// 		return res.json({
// 			message: `successfully updated time of ${day}: ${start}-${end} to ${day}: ${newstart}-${newend}`,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		return res.json({ errors: error });
// 	}
// });

router.post('/edituserschedule', auth, async (req, res) => {
	try {
		const { start, end, timeid, id, name, day } = req.body;
		const schedule = await Schedule.findById(id);
		switch (day) {
			case sunday:
				schedule.sunday = schedule.sunday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case monday:
				schedule.monday = schedule.monday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case tuesday:
				schedule.tuesday = schedule.tuesday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case wednesday:
				schedule.wednesday = schedule.wednesday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case thursday:
				schedule.thursday = schedule.thursday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case friday:
				schedule.friday = schedule.friday.filter((time) => {
					if (time.id === timeid) {
						time.name = name;
						time.start = start;
						time.end = end;
					}
					return true;
				});
				await schedule.save();
				break;
			case saturday:
				schedule.saturday = schedule.saturday.filter((time) => {
					if (time.id === timeid) {
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

router.post('/editgroupschedule', async (req, res) => {
	try {
		const { id } = req.body;
		const group = await Group.findById(id);
		const schedule = await Schedule.findById(group.scheduleid);
		const { day, start, end, name, newstart, newend, newname } = req.body;
		const newtime = { day, start: newstart, end: newend, name: newname };
		switch (day) {
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.monday.push(newtime);
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.tuesday.push(newtime);
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.wednesday.push(newtime);
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.thursday.push(newtime);
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.friday.push(newtime);
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.saturday.push(newtime);
				break;
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				schedule.sunday.push(newtime);
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({
			message: `successfully updated time of ${day}: ${start}-${end} to ${day}: ${newstart}-${newend}`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

// deleting a time in a schedule
router.delete('/removetimeuser', auth, async (req, res) => {
	try {
		const { day, timeid } = req.body;
		const user = await User.findById(req.user.id);
		const schedule = await Schedule.findById(user.scheduleid);
		switch (day) {
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => time._id !== timeid);
				await schedule.save();
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter(
					(time) => time._id !== timeid
				);
				await schedule.save();
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter(
					(time) => time._id !== timeid
				);
				await schedule.save();
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter(
					(time) => time._id !== timeid
				);
				await schedule.save();
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => time._id !== timeid);
				await schedule.save();
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter(
					(time) => time._id !== timeid
				);
				await schedule.save();
				break;
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => time._id !== timeid);
				await schedule.save();
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		return res.json({
			message: `successfully removed time ${day}, start: ${start}, end: ${end}`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

router.delete('/removetimegroup', auth, async (req, res) => {
	try {
		const { day, start, end, id } = req.body;
		const group = await Group.findById(id);
		const schedule = await Schedule.findById(group.scheduleid);
		switch (day) {
			case 'monday':
				schedule.monday = schedule.monday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'tuesday':
				schedule.tuesday = schedule.tuesday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'wednesday':
				schedule.wednesday = schedule.wednesday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'thursday':
				schedule.thursday = schedule.thursday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'friday':
				schedule.friday = schedule.friday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'saturday':
				schedule.saturday = schedule.saturday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			case 'sunday':
				schedule.sunday = schedule.sunday.filter((time) => {
					if (time.start === start && time.end === time.end) return false;
					return true;
				});
				break;
			default:
				return res.json({ errors: 'not a valid day' });
		}
		await schedule.save();
		return res.json({
			message: `successfully removed time ${day}, start: ${start}, end: ${end}`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;