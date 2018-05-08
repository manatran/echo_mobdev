const async = require('async');

const Post = require('../models/post');
const errorHandler = require('../utilities/errorHandler');

/*
Get all posts
*/
exports.get_posts = function (req, res, next) {
	const query = Post.find().populate('author');
	query.sort({ created_at: -1 });
	query.exec((err, posts) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving posts', next);
		if (!posts) {
			return errorHandler.handleAPIError(404, `Posts not found`, next);
		}
		return res.json(posts);
	});
}

/*
Get a certain post
*/
exports.get_post = function (req, res, next) {
	const id = req.params.postId;
	const query = Post.findById(id).populate('author');
	query.exec((err, post) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the post with id: ${id}`, next);
		if (!post) {
			return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
		}
		return res.json(post);
	});
}

/*
Create a Post
*/
exports.post_create_get = function (req, res, next) {
	async.parallel({}, function (err, results) {
		if (err) { return next(err); }
		res.json({ title: 'Create Post' });
	});
}

exports.post_create_post = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.type || !req.body.author || !req.body.spotify_id) {
		return errorHandler.handleAPIError(400, `Post must have a type, spotify_id, author`, next);
	}

	const post = new Post(req.body);
	post.save((err, post) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new post`, next);
		res.status(201).json(post);
	});
}

/*
Delete a Post
*/
exports.post_delete_delete = function (req, res, next) {
	const id = req.params.postId;
	Post.findByIdAndRemove(id)
		.then(post => {
			if (!post) {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Post width id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete post with id: ${id}`, next);
		});
}

/*
Soft-delete a post
*/
exports.post_softdelete_patch = function (req, res, next) {
	const id = req.params.postId;

	Post.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(post => {
			if (!post) {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			res.send(post);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete post with id: ${id}`, next);
		});
}

/*
Soft-undelete a post
*/
exports.post_softundelete_patch = function (req, res, next) {
	const id = req.params.postId;

	Post.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(post => {
			if (!post) {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			res.send(post);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete post with id: ${id}`, next);
		});
}