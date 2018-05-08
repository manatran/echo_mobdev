const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema(
  {
    spotify_id: { type: String, required: true, max: 128, unique: true },
    title: { type: String, required: true, max: 128 },
    artist: { type: String, required: true, max: 128 },
		artist_name: { type: String, required: true, max: 128 },
		images: [{
			height: { type: Number },
			width: { type: Number },
			url: { type: String, max: 128 }
		}],
		release_date: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

AlbumSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Album', AlbumSchema);