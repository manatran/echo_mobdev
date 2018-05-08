const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcommentSchema = new Schema(
	{
		parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		content: {type: String, max: 512, required: true},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
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

SubcommentSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Subcomment', SubcommentSchema);