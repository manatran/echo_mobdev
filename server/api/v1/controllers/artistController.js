const async = require('async');

const Artist = require('../models/artist');
const errorHandler = require('../utilities/errorHandler');

/*
Get all artists
*/
exports.get_artists = function (req, res, next) {
	const query = Artist.find();
	query.sort({ created_at: -1 });
	query.exec((err, artists) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving artists', next);
		if (!artists) {
			return errorHandler.handleAPIError(404, `Artists not found`, next);
		}
		return res.json(artists);
	});
}

/*
Get a certain artist
*/
exports.get_artist = function (req, res, next) {
	const id = req.params.artistId;
	const query = Artist.findOne({ 'spotify_id': id });
	query.exec((err, artist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the artist with id: ${id}`, next);
		if (!artist) {
			return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
		}
		return res.json(artist);
	});
}

/*
Create a Artist
*/
exports.artist_create_get = function (req, res, next) {
	async.parallel({}, function (err, results) {
		if (err) { return next(err); }
		res.json({ title: 'Create Artist' });
	});
}

exports.artist_create_artist = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.spotify_id) {
		return errorHandler.handleAPIError(400, `Required fields not met`, next);
	}

	const artist = new Artist(req.body);
	artist.save((err, artist) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new artist`, next);
		res.status(201).json(artist);
	});
}

/*
Delete a Artist
*/
exports.artist_delete_delete = function (req, res, next) {
	const id = req.params.artistId;
	Artist.findByIdAndRemove(id)
		.then(artist => {
			if (!artist) {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Artist width id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete artist with id: ${id}`, next);
		});
}

/*
Soft-delete a artist
*/
exports.artist_softdelete_patch = function (req, res, next) {
	const id = req.params.artistId;

	Artist.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(artist => {
			if (!artist) {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			res.send(artist);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete artist with id: ${id}`, next);
		});
}

/*
Soft-undelete a artist
*/
exports.artist_softundelete_patch = function (req, res, next) {
	const id = req.params.artistId;

	Artist.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(artist => {
			if (!artist) {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			res.send(artist);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Artist not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete artist with id: ${id}`, next);
		});
}