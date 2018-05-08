const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema(
	{
		spotify_id: { type: String, required: true, max: 128, unique: true },
		title: { type: String, required: true, max: 128 },
		album: { type: String, max: 128 },
		album_name: { type: String, max: 128 },
		artist: { type: String, max: 128 },
		artist_name: { type: String, max: 128 },
		explicit: { type: Boolean },
		duration: { type: Number },
		popularity: { type: Number },
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
		deleted_at: { type: Date, required: false }
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

SongSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Song', SongSchema);
