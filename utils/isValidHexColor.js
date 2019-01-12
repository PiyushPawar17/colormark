const isValidHexColor = color => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

module.exports = isValidHexColor;
