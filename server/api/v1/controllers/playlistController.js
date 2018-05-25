const async = require('async');
const mongoose = require('mongoose');

const Playlist = require('../models/playlist');
const errorHandler = require('../utilities/errorHandler');

/*
Get all playlists
*/
exports.get_playlists = function (req, res, next) {
	const query = Playlist.aggregate([
		{
			$lookup: {
				from: 'songs',
				localField: 'songs',
				foreignField: 'spotify_id',
				as: 'songs'
			}
		},
		{
			$unwind: {
				path: "$songs",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'albums',
				localField: 'songs.album',
				foreignField: 'spotify_id',
				as: 'album'
			}
		},
		{
			$group: {
				_id: "$_id",
				author: { $first: "$author" },
				title: { $first: "$title" },
				image: { $first: "$image" },
				songs: {
					$push: {
						spotify_id: "$songs.spotify_id",
						title: "$songs.title",
						artist_name: "$songs.artist_name",
						explicit: "$songs.explicit",
						duration: "$songs.duration",
						popularity: "$songs.popularity",
						album_name: "$songs.album_name",
						images: { "$arrayElemAt": ['$album.images', 0] }
					}
				}
			}
		}
	]);
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
	const id = req.params.userId;
	const query = Playlist.aggregate([
		{ $match: { author: mongoose.Types.ObjectId(id) } },
		{
			$lookup: {
				from: 'songs',
				localField: 'songs',
				foreignField: 'spotify_id',
				as: 'songs'
			}
		},
		{
			$unwind: {
				path: "$songs",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'albums',
				localField: 'songs.album',
				foreignField: 'spotify_id',
				as: 'album'
			}
		},
		{
			$group: {
				_id: "$_id",
				author: { $first: "$author" },
				title: { $first: "$title" },
				image: { $first: "$image" },
				songs: {
					$push: {
						spotify_id: "$songs.spotify_id",
						title: "$songs.title",
						artist_name: "$songs.artist_name",
						explicit: "$songs.explicit",
						duration: "$songs.duration",
						popularity: "$songs.popularity",
						album_name: "$songs.album_name",
						images: { "$arrayElemAt": ['$album.images', 0] }
					}
				}
			}
		}
	])
	query.exec((err, playlist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the playlist with id: ${id}`, next);
		if (!playlist) {
			return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
		}
		return res.json(playlist);
	});
}

/*
Get a certain playlist
*/
exports.get_playlist_by_id = function (req, res, next) {
	const id = req.params.playlistId;
	const query = Playlist.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(id) } },
		{
			$lookup: {
				from: 'songs',
				localField: 'songs',
				foreignField: 'spotify_id',
				as: 'songs'
			}
		},
		{
			$unwind: {
				path: "$songs",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'albums',
				localField: 'songs.album',
				foreignField: 'spotify_id',
				as: 'album'
			}
		},
		{
			$lookup: {
				from: 'users',
				localField: 'author',
				foreignField: '_id',
				as: 'author'
			}
		},
		{
			$group: {
				_id: "$_id",
				author: { $first: "$author" },
				title: { $first: "$title" },
				image: { $first: "$image" },
				description: { $first: "$description" },
				songs: {
					$push: {
						spotify_id: "$songs.spotify_id",
						title: "$songs.title",
						artist_name: "$songs.artist_name",
						explicit: "$songs.explicit",
						duration: "$songs.duration",
						popularity: "$songs.popularity",
						album_name: "$songs.album_name",
						images: { "$arrayElemAt": ['$album.images', 0] },
					}
				}
			}
		},
		{
			$project: {
				"_id": 1,
				"author": { "$arrayElemAt": ['$author', 0] },
				"title": 1,
				"image": 1,
				"description": 1,
				"songs": 1
			}
		}
	])
	query.exec((err, playlist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the playlist with id: ${id}`, next);
		if (!playlist) {
			return errorHandler.handleAPIError(404, `Playlist not found with id: ${id}`, next);
		}
		return res.json(playlist[0]);
	});
}

/*
Create a Playlist
*/
exports.playlist_create_playlist = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.image || !req.body.author) {
		return errorHandler.handleAPIError(400, `Playlist must have a title, image, author`, next);
	}

	const playlist = new Playlist(req.body);
	playlist.save((err, playlist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new playlist`, next);
		res.status(201).json(playlist);
	});
}

/*Add song to playlist*/
exports.playlist_add_song = function (req, res, next) {

	Playlist.findOne({ _id: req.params.playlistId })
		.then(playlist => {
			if (playlist.songs.filter(song => song.toString() === req.body.song).length > 0) {
				res.json({ error: 'Playlist already contains song' })
			} else {
				// Add song to songs array
				playlist.songs.unshift(req.body.song);
				playlist.save().then(playlist => res.json(playlist));
			}
		})
		.catch(err => res.status(404).json({ playlistnotfound: 'No playlist found' }));
}

/*Remove song from playlist*/
exports.playlist_remove_song = function (req, res, next) {

	Playlist.findOne({ _id: req.params.playlistId })
		.then(playlist => {
			if (playlist.songs.filter(song => song.toString() === req.body.song).length > 0) {
				// Get remove index
				const removeIndex = playlist.songs
					.map(item => item.toString())
					.indexOf(req.body.song);

				// Splice out of array
				playlist.songs.splice(removeIndex, 1);
				// Save
				playlist.save().then(playlist => res.json(playlist));
			} else {
				res.json({ error: 'Playlist does not contain this song' })
			}
		})
		.catch(err => res.status(404).json({ playlistnotfound: 'No playlist found' }));
}


/*Edit playlist*/
exports.playlist_edit = function (req, res, next) {
	const id = req.params.playlistId;

	Playlist.findByIdAndUpdate(id, req.body, { new: true })
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
			return errorHandler.handleAPIError(500, `Could not edit playlist with id: ${id}`, next);
		});
}

/*
Update a Playlist
*/
exports.playlist_update_put = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.image || !req.body.author) {
		return errorHandler.handleAPIError(400, `Playlist must have a title, image, author`, next);
	}

	const id = req.params.playlistId;

	Playlist.findByIdAndUpdate(id, {
		title: req.body.title,
		image: req.body.image,
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