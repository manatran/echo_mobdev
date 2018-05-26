const async = require('async');

const Comment = require('../models/comment');
const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');

/*
Get all comments
*/
exports.get_comments = function (req, res, next) {
	const query = Comment.find().populate('author').populate('subcomments').populate({
		path: 'subcomments',
		populate: {
			path: 'author',
			model: 'User',
		},
	});
	query.sort({ created_at: -1 });
	query.exec((err, comments) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving comments', next);
		if (!comments) {
			return errorHandler.handleAPIError(404, `Comments not found`, next);
		}
		return res.json(comments);
	});
}

/*
Get a certain comment
*/
exports.get_comments_by_post = function (req, res, next) {
	const id = req.params.postId;
	const query = Comment.find({'post_id': id}).populate('author').populate('subcomments').populate({
		path: 'subcomments',
		populate: {
			path: 'author',
			model: 'User',
		},
	});
	query.exec((err, comment) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the comment with id: ${id}`, next);
		if (!comment) {
			return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
		}
		return res.json(comment);
	});
}

/*
Create a Comment
*/
exports.comment_create_comment = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.post_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Comment must have a post, author, content`, next);
	}

	const comment = new Comment(req.body);
	comment.save((err, comment) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new comment`, next);
		comment.populate('author')
		res.status(201).json(comment);
	});
}

/*
Update a Comment
*/
exports.comment_update_put = function (req, res, next) {
	if (!req.body || !req.body.post_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Comment must have a post, author, content`, next);
	}

	const id = req.params.commentId;

	Comment.findByIdAndUpdate(id, {
		post_id: req.body.post_id,
		author: req.body.author,
		content: req.body.content,
	}, { new: true })
		.then(comment => {
			if (!comment) {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			res.send(comment);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not update comment with id: ${id}`, next);
		});
}

/*
Delete a Comment
*/
exports.comment_delete_delete = function (req, res, next) {
	const id = req.params.commentId;
	Comment.findByIdAndRemove(id)
		.then(comment => {
			if (!comment) {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Comment with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete comment with id: ${id}`, next);
		});
}

/*
Like a comment
*/
exports.comment_like_comment = function (req, res, next) {
	User.findById(req.user.id).then(profile => {
		Comment.findOne({_id: req.params.commentId})
			.then(comment => {
				if (comment.likes.filter(like => like.toString() === req.user.id).length > 0) {
					// Get remove index
					const removeIndex = comment.likes
						.map(item => item.toString())
						.indexOf(req.user.id);

					// Splice out of array
					comment.likes.splice(removeIndex, 1);
					// Save
					comment.save().then(comment => res.json(comment));
				} else {
					// Add user id to likes array
					comment.likes.unshift(req.user.id);
					comment.save().then(comment => res.json(comment));
				}
			})
			.catch(err => res.status(404).json({ commentnotfound: 'No comment found' }));
	})
	.catch(err => res.status(404).json({ usernotfound: 'No user found' }));
}

/*
Soft-delete a comment
*/
exports.comment_softdelete_patch = function (req, res, next) {
	const id = req.params.commentId;

	Comment.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(comment => {
			if (!comment) {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			res.send(comment);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete comment with id: ${id}`, next);
		});
}

/*
Soft-undelete a comment
*/
exports.comment_softundelete_patch = function (req, res, next) {
	const id = req.params.commentId;

	Comment.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(comment => {
			if (!comment) {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			res.send(comment);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Comment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete comment with id: ${id}`, next);
		});
}