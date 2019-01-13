const isEmpty = require('./isEmpty');
const isValidHexColor = require('./isValidHexColor');
const convertToHex = require('./convertToHex');

const colorValidation = ({ colors, type }) => {
	const error = {};
	let allColors = [];

	if (colors.constructor !== Array) {
		error.colors = 'Color parameter should be an array';
	} else {
		if (colors.length === 0) {
			error.colors = 'No color specified';
		} else if (type === 'swatch' && colors.length > 1) {
			error.colors = 'Swatch cannot have more than one color';
		} else if (type === 'palette' && colors.length !== 4) {
			error.colors = 'Palette should have four colors only';
		} else if (type === 'gradient' && colors.length !== 2) {
			error.colors = 'Gradients should have two colors colors only';
		} else {
			colors.forEach(color => {
				if (!isValidHexColor(color)) {
					error.colors = 'Invalid Hex Code';
				}
			});

			colors.forEach(color => {
				if (typeof color !== 'string') {
					error.colors = 'Color should be a string';
				}
			});
		}
	}

	if (typeof type !== 'string') {
		error.type = 'Type should be a string';
	}

	if (type !== 'swatch' && type !== 'palette' && type !== 'gradient') {
		error.type = 'Invalid color type';
	}

	if (isEmpty(error)) {
		allColors = colors.map(color => (color.length === 4 ? convertToHex(color).toUpperCase() : color.toUpperCase()));
	}

	return {
		error,
		valid: isEmpty(error),
		colors: [...allColors],
		type
	};
};

module.exports = { colorValidation };
