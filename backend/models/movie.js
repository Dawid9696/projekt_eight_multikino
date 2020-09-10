/** @format */

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		uppercase: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
		},
	},
	genre: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			const genrePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
			if (!genrePattern.test(value)) throw new Error("Bad pattern of genre!");
		},
	},
	photo: { type: String, trim: true, required: true },
	duration: { type: Number, trim: true, require: true, min: 60, max: 180 },
	released: { type: Boolean, default: false },
	age: { type: Number, trim: true, required: true, enum: [8, 12, 16, 18] },
	direction: { type: String, trim: true, require: true },
	description: {
		type: String,
		minlength: [2, "Description to short!"],
		trim: true,
		unique: true,
		required: true,
		valdiate(value) {
			if (validator.isEmpty(value)) throw new Error("Field descrpition is empty !");
		},
	},
	city: [
		{
			type: String,
			trim: true,
			required: true,
			validate(value) {
				const cityPattern = /\D/;
				if (!cityPattern.test(value)) throw new Error("City can not containt numbers");
				if (validator.isEmpty(value)) throw new Error("Field city is empty !");
			},
		},
	],
	seance: [
		{
			hour: {
				type: String,
				trim: true,
				valdiate(value) {
					const hourPattern = /\d{2}:\d{2}/;
					if (!hourPattern.test(value)) throw new Error("Format is not correct!");
				},
			},
			dimension: { type: String, enum: ["2D", "3D"], trim: true, required: true },
			dubbing: { type: String, enum: ["Napisy", "Dubbing"], trim: true, required: true },
		},
	],
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("ModelMovie", movieSchema);
