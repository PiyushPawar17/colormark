const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');

const authCheck = require('../../utils/authCheck');
const User = require('../../models/User');
const Color = require('../../models/Color');

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

// Route -> /api/users/favorite/:colorId
// Adds color to favotire
router.post('/favorite/:colorId', authCheck, async (req, res) => {
	const { colorId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(colorId)) {
		return res.status(400).json({ error: 'Invalid Color ID' });
	}

	const updatedColor = await Color.findByIdAndUpdate(colorId, { $addToSet: { likes: req.user.id } }, { new: true });
	const color = _.pick(updatedColor, colorData);

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ $addToSet: { favorites: colorId } },
		{ new: true }
	).populate('favorites', colorData);

	const user = _.pick(updatedUser, userData);

	res.json({ user, color });
});

// --- DELETE Requests ---

// Route -> /api/users/favorite/:colorId
// Removes color from favotire
router.delete('/favorite/:colorId', authCheck, async (req, res) => {
	const { colorId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(colorId)) {
		return res.status(400).json({ error: 'Invalid Color ID' });
	}

	const updatedColor = await Color.findByIdAndUpdate(colorId, { $pull: { likes: req.user.id } }, { new: true });
	const color = _.pick(updatedColor, colorData);

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ $pull: { favorites: colorId } },
		{ new: true }
	).populate('favorites', colorData);

	const user = _.pick(updatedUser, userData);

	res.json({ user, color });
});

module.exports = router;
