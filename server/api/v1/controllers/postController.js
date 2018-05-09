const async = require('async');
const mongoose = require('mongoose');
const Post = require('../models/post');
const errorHandler = require('../utilities/errorHandler');

/*
Get all posts
*/
exports.get_posts = function (req, res, next) {
	const query = Post.aggregate([
		{
			$project: {
				"content": "$content",
				"author": "$author",
				"type": "$type",
				"likes": "$likes",
				"created_at": "$created_at",
				"updated_at": "$updated_at",
				"deleted_at": "$deleted_at"
			}
		},
		{
			$facet: {
				"albums": [
					{ $match: { "type": "album" } },
					{
						$lookup: {
							from: "albums",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
				],
				"artists": [
					{ $match: { "type": "artist" } },
					{
						$lookup: {
							from: "artists",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
				],
				"songs": [
					{ $match: { "type": "song" } },
					{
						$lookup: {
							from: "songs",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
					{
						$unwind: {
							path: "$content",
							preserveNullAndEmptyArrays: true
						}
					},
					{
						$lookup: {
							from: 'albums',
							localField: 'content.album',
							foreignField: 'spotify_id',
							as: 'album'
						}
					},
					{
						$group: {
							_id: "$_id",
							author: { $first: "$author" },
							type: { $first: "$type" },
							likes: { $first: "$likes" },
							content: {
								$push: {
									spotify_id: "$content.spotify_id",
									title: "$content.title",
									artist_name: "$content.artist_name",
									explicit: "$content.explicit",
									duration: "$content.duration",
									popularity: "$content.popularity",
									album_name: "$content.album_name",
									images: { "$arrayElemAt": ['$album.images', 0] },
									"created_at": "$created_at",
									"updated_at": "$updated_at",
									"deleted_at": "$deleted_at"
								}
							}
						}
					}
				],
			}
		},
		{ $project: { all: { $setUnion: ["$albums", "$artists", "$songs"] } } },
		{ $unwind: "$all" },
		{ $replaceRoot: { newRoot: "$all" } },
		{ $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
		{
			$project: {
				"author": { "$arrayElemAt": ['$author', 0] },
				"type": 1,
				"content": { "$arrayElemAt": ['$content', 0] },
				"likes": 1,
				"created_at": 1,
				"updated_at": 1,
				"deleted_at": 1,
			}
		}
	]);
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
	const query = Post.aggregate([
		{ $match: { "_id": mongoose.Types.ObjectId(req.params.postId) } },
		{
			$project: {
				"content": "$content",
				"author": "$author",
				"type": "$type",
				"likes": "$likes",
				"created_at": "$created_at",
				"updated_at": "$updated_at",
				"deleted_at": "$deleted_at"
			}
		},
		{
			$facet: {
				"albums": [
					{ $match: { "type": "album" } },
					{
						$lookup: {
							from: "albums",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
				],
				"artists": [
					{ $match: { "type": "artist" } },
					{
						$lookup: {
							from: "artists",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
				],
				"songs": [
					{ $match: { "type": "song" } },
					{
						$lookup: {
							from: "songs",
							localField: "content",
							foreignField: "spotify_id",
							as: "content"
						}
					},
					{
						$unwind: {
							path: "$content",
							preserveNullAndEmptyArrays: true
						}
					},
					{
						$lookup: {
							from: 'albums',
							localField: 'content.album',
							foreignField: 'spotify_id',
							as: 'album'
						}
					},
					{
						$group: {
							_id: "$_id",
							author: { $first: "$author" },
							type: { $first: "$type" },
							likes: { $first: "$likes" },
							content: {
								$push: {
									spotify_id: "$content.spotify_id",
									title: "$content.title",
									artist_name: "$content.artist_name",
									explicit: "$content.explicit",
									duration: "$content.duration",
									popularity: "$content.popularity",
									album_name: "$content.album_name",
									images: { "$arrayElemAt": ['$album.images', 0] },
									"created_at": "$created_at",
									"updated_at": "$updated_at",
									"deleted_at": "$deleted_at"
								}
							}
						}
					}
				],
			}
		},
		{ $project: { all: { $setUnion: ["$albums", "$artists", "$songs"] } } },
		{ $unwind: "$all" },
		{ $replaceRoot: { newRoot: "$all" } },
		{ $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' } },
		{
			$project: {
				"author": { "$arrayElemAt": ['$author', 0] },
				"type": 1,
				"likes": 1,
				"created_at": 1,
				"updated_at": 1,
				"deleted_at": 1,
				"content": { "$arrayElemAt": ['$content', 0] }
			}
		},
	]);
	query.exec((err, post) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the post with id: ${id}`, next);
		if (!post) {
			return errorHandler.handleAPIError(404, `Post not found with id: ${id}`, next);
		}
		return res.json(post[0]);
	});
}

/*
Create a Post
*/
exports.post_create_post = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.type || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Post must have a type, content, author`, next);
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
			res.status(200).json({ action: 'DELETE', message: `Post with id: ${id} deleted successfully!` });
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