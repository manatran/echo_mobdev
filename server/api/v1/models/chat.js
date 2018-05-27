const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
	{
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
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

ChatSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Chat', ChatSchema);