const async = require('async');

const Album = require('../models/album');
const errorHandler = require('../utilities/errorHandler');

/*
Get all albums
*/
exports.get_albums = function (req, res, next) {
	const query = Album.find();
	query.sort({ created_at: -1 });
	query.exec((err, albums) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving albums', next);
		if (!albums) {
			return errorHandler.handleAPIError(404, `Albums not found`, next);
		}
		return res.json(albums);
	});
}

/*
Get a certain album
*/
exports.get_album = function (req, res, next) {
	const id = req.params.albumId;
	const query = Album.findOne({ 'spotify_id': id });
	query.exec((err, album) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the album with id: ${id}`, next);
		if (!album) {
			return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
		}
		return res.json(album);
	});
}

/*
Create a Album
*/
exports.album_create_get = function (req, res, next) {
	async.parallel({}, function (err, results) {
		if (err) { return next(err); }
		res.json({ title: 'Create Album' });
	});
}

exports.album_create_album = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.spotify_id || !req.body.artist || !req.body.artist_name) {
		return errorHandler.handleAPIError(400, `Required fields not met`, next);
	}

	const album = new Album(req.body);
	album.save((err, album) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new album`, next);
		res.status(201).json(album);
	});
}

/*
Delete a Album
*/
exports.album_delete_delete = function (req, res, next) {
	const id = req.params.albumId;
	Album.findByIdAndRemove(id)
		.then(album => {
			if (!album) {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Album width id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete album with id: ${id}`, next);
		});
}

/*
Soft-delete a album
*/
exports.album_softdelete_patch = function (req, res, next) {
	const id = req.params.albumId;

	Album.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(album => {
			if (!album) {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			res.send(album);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete album with id: ${id}`, next);
		});
}

/*
Soft-undelete a album
*/
exports.album_softundelete_patch = function (req, res, next) {
	const id = req.params.albumId;

	Album.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(album => {
			if (!album) {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			res.send(album);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Album not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete album with id: ${id}`, next);
		});
}