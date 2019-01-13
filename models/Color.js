const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ColorSchema = new Schema({
	colors: [
		{
			type: String,
			trim: true
		}
	],
	type: {
		type: String,
		required: true
	},
	addedBy: {
		type: String,
		required: true
	},
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	]
});

const Color = mongoose.model('color', ColorSchema);

module.exports = Color;
