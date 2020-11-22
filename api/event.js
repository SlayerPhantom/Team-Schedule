const Event = require('../models/Event');
const User = require('../models/User');
const router = require('express').Router();
const auth = require('../utils/auth');

// authentication required
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
		const user = await User.findById(req.user.id);
		user.events.push({ id: event.id, name: event.name });
		return res.json(event);
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

// authentication required
router.delete('/remove', auth, async (req, res) => {
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

// authentication required
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

router.post('/adduser', async (req, res) => {
	try {
		const { id, userid, username } = req.body;

		const event = await Event.findById(req.body.id);
		if (!event) return res.json({ errors: 'event does not exist' });

		const user = await User.findById(req.body.userid);
		if (!user) return res.json({ errors: 'user does not exist' });

		event.members.push({ id: userid, username });
		user.events.push({ id: id, name: event.name });

		await user.save();
		await event.save();

		return res.json({
			message: `successfully added user to Event: ${event.name}`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

// authentication required
router.delete('/removeuser', auth, async (req, res) => {
	try {
		const { id, userid } = req.body;
		const user = await User.findById(req.user.id);
		if (!user) return res.json({ errors: 'user does not exist' });

		const event = Event.findById(id);
		if (!event) return res.json({ errors: 'event does not exist' });
		event.members = event.members.filter((member) => member.id !== userid);
		await event.save();
		user.events = user.events.filter((e) => e.id !== id);
		await user.save();
		return res.json({
			message: `successfully removed user from Event: ${event.name}`,
		});
	} catch (error) {
		console.error(error);
		return res.json({ errors: error });
	}
});

module.exports = router;
