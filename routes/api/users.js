const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');

const authCheck = require('../../utils/authCheck');
const User = require('../../models/User');

// Routes for /api/users

// User data to be returned
const userData = ['_id', 'name', 'favorites'];
// Color data to be returned
const colorData = ['_id', 'colors', 'type', 'likes'];

// --- GET Requests ---

// Route -> /api/users/me
// Returns current user
router.get('/me', async (req, res) => {
	if (req.user) {
		const currentUser = await User.findById(req.user.id).populate('favorites', colorData);
		const user = _.pick(currentUser, userData);

		res.json({ user });
	} else {
		res.json({ user: null });
	}
});

// --- POST Requests ---

// Route -> /api/users/favorite/:color
// Adds color to favotire
router.get('/favorite/:colorId', authCheck, async (req, res) => {
	const { colorId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(colorId)) {
		return res.status(400).json({ error: 'Invalid Color ID' });
	}

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ $addToSet: { favorites: colorId } },
		{ new: true }
	).populate('favorites', colorData);

	const user = _.pick(updatedUser, userData);

	res.json({ user });
});

// --- DELETE Requests ---

// Route -> /api/users/favorite/:color
// Removes color from favotire
router.delete('/favorite/:colorId', authCheck, async (req, res) => {
	const { colorId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(colorId)) {
		return res.status(400).json({ error: 'Invalid Color ID' });
	}

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ $pullAll: { favorites: colorId } },
		{ new: true }
	).populate('favorites', colorData);

	const user = _.pick(updatedUser, userData);

	res.json({ user });
});

module.exports = router;
