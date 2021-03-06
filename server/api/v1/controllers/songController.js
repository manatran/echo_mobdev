const async = require('async');

const Song = require('../models/song');
const Album = require('../models/album');
const errorHandler = require('../utilities/errorHandler');

/*
Get all songs
*/
exports.get_songs = function (req, res, next) {
	const query = Song
		.aggregate([
			{
				$project: {
					"spotify_id": "$spotify_id",
					"title": "$title",
					"album": "$album",
					"artist": "$artist",
					"artist_name": "$artist_name",
					"explicit": "$explicit",
					"duration": "$duration",
					"popularity": "$popularity",
					"created_at": "$created_at",
					"updated_at": "$updated_at",
					"deleted_at": "$deleted_at"
				}
			},
			{ $lookup: { from: 'albums', localField: 'album', foreignField: 'spotify_id', as: 'album' } },
			{
				$project: {
					"spotify_id": 1,
					"title": 1,
					"artist": 1,
					"artist_name": 1,
					"explicit": 1,
					"duration": 1,
					"popularity": 1,
					album: { "$arrayElemAt": ['$album', 0] },
					"created_at": 1,
					"updated_at": 1,
					"deleted_at": 1
				}
			},
		])
		.exec((err, songs) => {
			if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving songs', next);
			if (!songs) {
				return errorHandler.handleAPIError(404, `Songs not found`, next);
			}
			return res.send(songs);
		});
}

/*
Get a certain song
*/
exports.get_song = function (req, res, next) {
	const id = req.params.songId;
	const query = Song.aggregate([
		{ $match: { 'spotify_id': id } },
		{
			$project: {
				"spotify_id": "$spotify_id",
				"title": "$title",
				"album": "$album",
				"artist": "$artist",
				"artist_name": "$artist_name",
				"explicit": "$explicit",
				"duration": "$duration",
				"popularity": "$popularity",
				"created_at": "$created_at",
				"updated_at": "$updated_at",
				"deleted_at": "$deleted_at"
			}
		},
		{ $lookup: { from: 'albums', localField: 'album', foreignField: 'spotify_id', as: 'album' } },
		{
			$project: {
				"spotify_id": 1,
				"title": 1,
				"artist": 1,
				"artist_name": 1,
				"explicit": 1,
				"duration": 1,
				"popularity": 1,
				album: { "$arrayElemAt": ['$album', 0] },
				"created_at": 1,
				"updated_at": 1,
				"deleted_at": 1
			}
		}
	])
	query.exec((err, song) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the song with id: ${id}`, next);
		if (!song) {
			return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
		}
		return res.json(song[0]);
	});
}

/*
Create a Song
*/
exports.song_create_song = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.spotify_id) {
		return errorHandler.handleAPIError(400, `Required fields not met`, next);
	}

	const song = new Song(req.body);
	song.save((err, song) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new song`, next);
		res.status(201).json(song);
	});
}

/*
Delete a Song
*/
exports.song_delete_delete = function (req, res, next) {
	const id = req.params.songId;
	Song.findByIdAndRemove(id)
		.then(song => {
			if (!song) {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Song with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete song with id: ${id}`, next);
		});
}

/*
Soft-delete a song
*/
exports.song_softdelete_patch = function (req, res, next) {
	const id = req.params.songId;

	Song.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(song => {
			if (!song) {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			res.send(song);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete song with id: ${id}`, next);
		});
}

/*
Soft-undelete a song
*/
exports.song_softundelete_patch = function (req, res, next) {
	const id = req.params.songId;

	Song.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(song => {
			if (!song) {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			res.send(song);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Song not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete song with id: ${id}`, next);
		});
}