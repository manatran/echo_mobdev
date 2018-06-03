const errorHandler = require('../utilities/errorHandler');
const Post = require('../models/post');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
const request = require('request');
const rp = require('request-promise');
const config = require('../../../config/config');

/* Spotify configuration */
var client_id = config.spotify.client_id;
var client_secret = config.spotify.client_secret;
var authOptions = {
	url: 'https://accounts.spotify.com/api/token',
	headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
	form: { grant_type: 'client_credentials' },
	json: true
};

/*
Get all posts
*/
exports.searchArtist = function (req, res, next) {
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			// use the access token to access the Spotify Web API
			var token = body.access_token;
			var options = {
				url: 'https://api.spotify.com/v1/search?q=' + req.params.term.replace(' ', '%20') + '&type=artist&limit=3',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				json: true
			};
			request.get(options, function (error, response, body) {
				if (body) {
					let artists = [];
					for (let i = 0; i < body.artists.items.length; i++) {
						let currentArtist = body.artists.items[i];
						let artist = {
							"spotify_id": currentArtist.id,
							"title": currentArtist.name,
							"genres": currentArtist.genres,
							"images": currentArtist.images
						}
						artists.push(artist)
						//verify that artist is not yet in db
						const query = Artist.findOne({ 'spotify_id': artist.spotify_id }).exec((err, artistResult) => {
							if (err) return errorHandler.handleAPIError(500, `Could not get the artist with id: ${artist.spotify_id}`, next);
							if (!artistResult) {
								const newArtist = new Artist(artist);
								newArtist.save((err, artist) => {
									if (err) return errorHandler.handleAPIError(500, `Could not save the new artist`, next);
								});
							}
						});
					}
					res.json(artists)
				} else {
					res.json(err)
				}
			});
		}
	})
}

exports.searchAlbum = function (req, res, next) {
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			// use the access token to access the Spotify Web API
			var token = body.access_token;
			var options = {
				url: 'https://api.spotify.com/v1/search?q=' + req.params.term.replace(' ', '%20') + '&type=album&limit=5',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				json: true
			};
			request.get(options, function (error, response, body) {
				if (body) {
					let albums = [];
					for (let i = 0; i < body.albums.items.length; i++) {
						let currentAlbum = body.albums.items[i];
						let album = {
							"spotify_id": currentAlbum.id,
							"title": currentAlbum.name,
							"artist": currentAlbum.artists[0].id,
							"artist_name": currentAlbum.artists[0].name,
							"images": currentAlbum.images,
							"release_date": currentAlbum.release_date
						}
						albums.push(album)
						//verify that album is not yet in db
						const query = Album.findOne({ 'spotify_id': album.spotify_id }).exec((err, albumResult) => {
							if (err) return errorHandler.handleAPIError(500, `Could not get the album with id: ${album.spotify_id}`, next);
							if (!albumResult) {
								const newAlbum = new Album(album);
								newAlbum.save((err, album) => {
									if (err) return errorHandler.handleAPIError(500, `Could not save the new album`, next);
								});
							}
						});
					}
					res.json(albums)
				} else {
					res.json(err)
				}
			});
		}
	})
}

exports.searchSong = function (req, res, next) {
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			// use the access token to access the Spotify Web API
			var token = body.access_token;
			var options = {
				url: 'https://api.spotify.com/v1/search?q=' + req.params.term.replace(' ', '%20') + '&type=track&limit=15',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				json: true
			};
			request.get(options, function (error, response, body) {
				if (body) {
					let songs = [];
					for (let i = 0; i < body.tracks.items.length; i++) {
						let currentTrack = body.tracks.items[i];
						//seed albums into database
						request({
							method: 'GET',
							uri: `https://localhost:8080/api/v1/search/album/${currentTrack.album.name} ${currentTrack.artists[0].name}`,
							rejectUnauthorized: false,
							json: true
						})
						let song = {
							"spotify_id": currentTrack.id,
							"title": currentTrack.name,
							"album": currentTrack.album.id,
							"album_name": currentTrack.album.name,
							"artist": currentTrack.artists[0].id,
							"artist_name": currentTrack.artists[0].name,
							"explicit": currentTrack.explicit,
							"duration": currentTrack.duration_ms,
							"popularity": currentTrack.popularity
						}
						songs.push(song)
						//verify that song is not yet in db
						const query = Song.findOne({ 'spotify_id': song.spotify_id }).exec((err, songResult) => {
							if (err) return errorHandler.handleAPIError(500, `Could not get the song with id: ${song.spotify_id}`, next);
							if (!songResult) {
								const newSong = new Song(song);
								newSong.save((err, song) => {
									if (err) return errorHandler.handleAPIError(500, `Could not save the new song`, next);
								});
							}
						});
					}
					res.json(songs)
				} else {
					res.json(err)
				}
			});
		}
	})
}

exports.post_create_post = function (req, res, next) {
	if (!req.body || !req.body.title || !req.body.synopsis || !req.body.body) {
		return errorHandler.handleAPIError(400, `Post must have a title, synopsis, body`, next);
	}

	const post = new Post(req.body);
	post.save((err, post) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new post`, next);
		res.status(201).json(post);
	});
}