const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
		post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
		author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
		likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
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

CommentSchema.virtual('id').get(() => this._id );

module.exports = mongoose.model('Comment', CommentSchema);