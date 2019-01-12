const router = require('express').Router();
const passport = require('passport');

const authCheck = require('../../utils/authCheck');
const User = require('../../models/User');

// Routes for /api/users

// --- GET Requests ---

// Route -> /api/users/me
// Google auth route
router.get('/me', (req, res) => {
	if (req.user) {
		User.findById(req.user.id).then(user => {
			res.json({ user });
		});
	} else {
		res.json({ user: null });
	}
});

module.exports = router;
