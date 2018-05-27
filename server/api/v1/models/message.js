const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		author: { type: String, ref:'User', max: 128, required: true },
		conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
		content: { type: String, max: 512, required: true },
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

MessageSchema.virtual('id').get(() => this._id);

module.exports = mongoose.model('Message', MessageSchema);