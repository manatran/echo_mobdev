const async = require('async');

const Chat = require('../models/chat');
const errorHandler = require('../utilities/errorHandler');

/*
Get all chats
*/
exports.get_chats = function (req, res, next) {
	const query = Chat.find().populate('members');
	query.sort({ created_at: -1 });
	query.exec((err, chats) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving chats', next);
		if (!chats) {
			return errorHandler.handleAPIError(404, `Chats not found`, next);
		}
		return res.json(chats);
	});
}

/*
Get all chats
*/
exports.get_chats_by_user = function (req, res, next) {
	const id = req.params.userId;
	const query = Chat.find({ members: id }).populate('members');
	query.sort({ created_at: -1 });
	query.exec((err, chats) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving chats', next);
		if (!chats) {
			return errorHandler.handleAPIError(404, `Chats not found`, next);
		}
		return res.json(chats);
	});
}

/*
Get a certain chat
*/
exports.get_chat = function (req, res, next) {
	const id = req.params.chatId;
	const query = Chat.findById(id).populate('members');
	query.exec((err, chat) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the chat with id: ${id}`, next);
		if (!chat) {
			return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
		}
		return res.json(chat);
	});
}

/*
Create a Chat
*/
exports.chat_create_chat = function (req, res, next) {
	if (!req.body || !req.body.members) {
		return errorHandler.handleAPIError(400, `Chat must have members`, next);
	}

	const query = Chat.findOne({ members: {$all: req.body.members} })
		.exec((err, chat) => {
			if (err) return errorHandler.handleAPIError(400, err, next);
			if (chat) {
				return res.json(chat)
			}
			else {
				const newChat = new Chat(req.body);
				newChat.save((err, chat) => {
					if (err) return errorHandler.handleAPIError(500, `Could not save the new chat`, next);
					res.status(201).json(newChat);
				});
			}
		})
}

/*
Update a Chat
*/
exports.chat_update_put = function (req, res, next) {
	if (!req.body || !req.members) {
		return errorHandler.handleAPIError(400, `Chat must have members`, next);
	}

	const id = req.params.chatId;

	Chat.findByIdAndUpdate(id, {
		members: req.body.members,
	}, { new: true })
		.then(chat => {
			if (!chat) {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			res.send(chat);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not update chat with id: ${id}`, next);
		});
}

/*
Delete a Chat
*/
exports.chat_delete_delete = function (req, res, next) {
	const id = req.params.chatId;
	Chat.findByIdAndRemove(id)
		.then(chat => {
			if (!chat) {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Chat with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete chat with id: ${id}`, next);
		});
}

/*
Soft-delete a chat
*/
exports.chat_softdelete_patch = function (req, res, next) {
	const id = req.params.chatId;

	Chat.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(chat => {
			if (!chat) {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			res.send(chat);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete chat with id: ${id}`, next);
		});
}

/*
Soft-undelete a chat
*/
exports.chat_softundelete_patch = function (req, res, next) {
	const id = req.params.chatId;

	Chat.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(chat => {
			if (!chat) {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			res.send(chat);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Chat not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete chat with id: ${id}`, next);
		});
}