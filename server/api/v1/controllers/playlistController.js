const async = require('async');

const Playlist = require('../models/playlist');
const errorHandler = require('../utilities/errorHandler');

/*
Get all playlists
*/
exports.get_playlists = function (req, res, next) {
	const query = Playlist.find();
	query.sort({ created_at: -1 });
	query.exec((err, playlists) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving playlists', next);
		if (!playlists) {
			return errorHandler.handleAPIError(404, `Playlists not found`, next);
		}
		return res.json(playlists);
	});
}

/*
Get a certain playlist
*/
exports.get_playlist = function (req, res, next) {
	const id = req.params.playlistId;
	const query = Playlist.findById(id).populate('author');
	query.exec((err, playlist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the playlist with id: ${id}`, next);
		if (!playlist) {
			return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
		}
		return res.json(playlist);
	});
}

/*
Create a Playlist
*/
exports.playlist_create_playlist = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.title || !req.body.type || !req.body.author) {
		return errorHandler.handleAPIError(400, `Playlist must have a title, type, author`, next);
	}

	const playlist = new Playlist(req.body);
	playlist.save((err, playlist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new playlist`, next);
		res.status(201).json(playlist);
	});
}

/*
Update a Playlist
*/
exports.playlist_update_get = function (req, res, next) {
	async.parallel({
		playlist: function (callback) {
			const id = req.params.playlistId;
			Playlist.findById(id, callback);
		},
		categories: function (callback) {
			Category.find(callback).sort({ created_at: -1 });
		},
	}, function (err, results) {
		if (err) { return next(err); }
		res.json({ playlist: results.playlist });
	});
}

exports.playlist_update_put = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.type || !req.body.author) {
		return errorHandler.handleAPIError(400, `Playlist must have a title, synopsis, body`, next);
	}

	const id = req.params.playlistId;

	Playlist.findByIdAndUpdate(id, {
		title: req.body.title,
		type: req.body.type,
		songs: req.body.songs
	}, { new: true })
		.then(playlist => {
			if (!playlist) {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			res.send(playlist);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not update playlist with id: ${id}`, next);
		});
}

/*
Delete a Playlist
*/
exports.playlist_delete_delete = function (req, res, next) {
	const id = req.params.playlistId;
	Playlist.findByIdAndRemove(id)
		.then(playlist => {
			if (!playlist) {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Playlist with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete playlist with id: ${id}`, next);
		});
}

/*
Soft-delete a playlist
*/
exports.playlist_softdelete_patch = function (req, res, next) {
	const id = req.params.playlistId;

	Playlist.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(playlist => {
			if (!playlist) {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			res.send(playlist);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete playlist with id: ${id}`, next);
		});
}

/*
Soft-undelete a playlist
*/
exports.playlist_softundelete_patch = function (req, res, next) {
	const id = req.params.playlistId;

	Playlist.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(playlist => {
			if (!playlist) {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			res.send(playlist);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete playlist with id: ${id}`, next);
		});
}