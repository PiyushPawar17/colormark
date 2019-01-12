const router = require('express').Router();
const _ = require('lodash');

const authCheck = require('../../utils/authCheck');
const Color = require('../../models/Color');

const { colorValidation } = require('../../utils/colorValidation');

// Routes for /api/colors

// Color data to be returned
const colorData = ['_id', 'colors', 'type'];

// --- GET Requests ---

// Route -> /api/colors/:type
// Returns swatches, palettes or gradients
router.get('/:type', async (req, res) => {
	const { type } = req.params;
	const colorType = type === 'swatches' ? 'swatch' : type.substring(0, type.length - 1);
	const allColors = await Color.find({ type: colorType });
	const colors = allColors.map(color => _.pick(color, colorData));

	res.json({ colors });
});

// --- POST Requests ---

// Route -> /api/colors
// Creates a new swatch, palette or gradient
router.post('/', authCheck, async (req, res) => {
	const { error, valid, colors, type } = colorValidation(req.body);

	if (!valid) {
		return res.status(400).json({ error });
	}

	const exist = await Color.findOne({ colors: { $all: colors }, type });

	if (!exist) {
		const newColor = new Color({ colors, type, addedBy: req.user.name });
		const currentColor = await newColor.save();
		const color = _.pick(currentColor, colorData);
		res.json({ color });
	} else {
		res.status(400).json({ error: 'Color Scheme already exist' });
	}
});

module.exports = router;
