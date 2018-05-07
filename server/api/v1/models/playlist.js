const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./song')

const PlaylistSchema = new Schema(
  {
		title: {type: String, required: true, max: 128},
		type: { type: String, enum:["public","private"], required: true },
		author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		images: [{
			height: { type: Number },
			width: { type: Number },
			url: { type: String, max: 128 }
		}],
		songs: [{type: String, ref: 'Song'}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    published_at: { type: Date, required: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

PlaylistSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Playlist', PlaylistSchema);