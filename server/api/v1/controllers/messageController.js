const async = require('async');

const Message = require('../models/message');
const errorHandler = require('../utilities/errorHandler');

/*
Get all messages
*/
exports.get_messages = function (req, res, next) {
	const query = Message.find();
	query.sort({ created_at: -1 });
	query.exec((err, messages) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving messages', next);
		if (!messages) {
			return errorHandler.handleAPIError(404, `Messages not found`, next);
		}
		return res.json(messages);
	});
}

/*
Get a certain message
*/
exports.get_messages_by_chatId = function (req, res, next) {
	const id = req.params.chatId;
	const query = Message.findBy({'conversation': id});
	query.exec((err, message) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the message with id: ${id}`, next);
		if (!message) {
			return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
		}
		return res.json(message);
	});
}

/*
Create a Message
*/
exports.message_create_message = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.conversation_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Message must have a conversation, author, content`, next);
	}

	const message = new Message(req.body);
	message.save((err, message) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new message`, next);
		res.status(201).json(message);
	});
}

/*
Update a Message
*/
exports.message_update_put = function (req, res, next) {
	if (!req.body || !req.body.conversation_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Message must have a conversation, author, content`, next);
	}

	const id = req.params.messageId;

	Message.findByIdAndUpdate(id, {
		title: req.body.title,
		members: req.body.members,
	}, { new: true })
		.then(message => {
			if (!message) {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			res.send(message);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not update message with id: ${id}`, next);
		});
}

/*
Delete a Message
*/
exports.message_delete_delete = function (req, res, next) {
	const id = req.params.messageId;
	Message.findByIdAndRemove(id)
		.then(message => {
			if (!message) {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Message with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete message with id: ${id}`, next);
		});
}

/*
Soft-delete a message
*/
exports.message_softdelete_patch = function (req, res, next) {
	const id = req.params.messageId;

	Message.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(message => {
			if (!message) {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			res.send(message);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete message with id: ${id}`, next);
		});
}

/*
Soft-undelete a message
*/
exports.message_softundelete_patch = function (req, res, next) {
	const id = req.params.messageId;

	Message.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(message => {
			if (!message) {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			res.send(message);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Message not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete message with id: ${id}`, next);
		});
}