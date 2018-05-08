const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricSchema = new Schema(
  {
		verses: [{type: String, max: 128, required: true }],
		song: {type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true},
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

LyricSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Lyric', LyricSchema);