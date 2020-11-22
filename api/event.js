const Event = require('../models/Event');
const User = require('../models/User');
const router = require('express').Router();
const auth = require('../utils/auth');

router.post('/add', auth, async (req, res) => {
	try {
		const { name, start, end } = req.body;
		const newEvent = new Event({
			name,
			start,
			end,
			members: [{ id: req.user.id, username: req.user.username }],
			creator: req.user.username,
		});
		const event = await newEvent.save();
		const user = User.findById(req.user.id);
		user.events.push({ id: event.id, name: event.name });
		return res.json(event);
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

router.delete('/delete', auth, async (req, res) => {
	try {
		const { id } = req.body;
		const event = await Event.findById(id);
		if (event) {
			if (event.creator === req.user.username) {
				await event.remove();
				const members = event.members;
				members.forEach(async (member) => {
					const user = await User.findById(member.id);
					user.events = user.events.filter((events) => events.id !== id);
					user.save();
				});
				return res.json({ message: 'successfully deleted event' });
			} else {
				return res.json({ errors: 'you cannot delete this event' });
			}
		} else {
			return res.json({ errors: 'event does not exist' });
		}
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

router.post('/edit', auth, async (req, res) => {
	try {
		const { name, start, end } = req.body;
		const event = await Event.findById(req.body.id);
		if (event.creator !== req.user.username)
			return res.json({ errors: 'you cannot edit this event' });
		event.name = name;
		event.start = start;
		event.end = end;
		await event.save();
		return res.json({ message: 'successfully updated event' });
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
