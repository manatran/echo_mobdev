const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
	{
		spotify_id: { type: String, required: true, max: 128, unique: true },
		title: { type: String, required: true, max: 128 },
		images: [{
			height: { type: Number },
			width: { type: Number },
			url: { type: String, max: 128 }
		}],
		genres: [String],
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
		deleted_at: { type: Date, required: false }
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

ArtistSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Artist', ArtistSchema);