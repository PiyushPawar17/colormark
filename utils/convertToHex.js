const convertToHex = color =>
	color
		.split('')
		.map(hex => `${hex}${hex}`)
		.join('')
		.substring(1);

module.exports = convertToHex;
