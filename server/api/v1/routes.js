const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();

/*
Controllers
*/
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');
const albumController = require('./controllers/albumController');
const artistController = require('./controllers/artistController');
const songController = require('./controllers/songController');
const searchController = require('./controllers/searchController');

/*
Routes
*/
//router.get('/posts', auth.authenticateJwt(), postController.get_posts);// Securing the end-point to-do

router.get('/search/artist/:term', searchController.searchArtist);
router.get('/search/album/:term', searchController.searchAlbum);
router.get('/search/song/:term', searchController.searchSong);

router.get('/albums', albumController.get_albums);
router.get('/albums/:albumId', albumController.get_album);
router.post('/albums', albumController.album_create_album);
router.get('/albums/:albumId/update', albumController.album_update_get);
router.put('/albums/:albumId', albumController.album_update_put);
router.delete('/albums/:albumId', albumController.album_delete_delete);
router.patch('/albums/:albumId/softdelete', albumController.album_softdelete_patch);
router.patch('/albums/:albumId/softundelete', albumController.album_softundelete_patch);

router.get('/artists', artistController.get_artists);
router.get('/artists/:artistId', artistController.get_artist);
router.post('/artists', artistController.artist_create_artist);
router.get('/artists/:artistId/update', artistController.artist_update_get);
router.put('/artists/:artistId', artistController.artist_update_put);
router.delete('/artists/:artistId', artistController.artist_delete_delete);
router.patch('/artists/:artistId/softdelete', artistController.artist_softdelete_patch);
router.patch('/artists/:artistId/softundelete', artistController.artist_softundelete_patch);

router.get('/songs', songController.get_songs);
router.get('/songs/:songId', songController.get_song);
router.post('/songs', songController.song_create_song);
router.get('/songs/:songId/update', songController.song_update_get);
router.put('/songs/:songId', auth.authenticateJwt(), songController.song_update_put);
router.delete('/songs/:songId', auth.authenticateJwt(), songController.song_delete_delete);
router.patch('/songs/:songId/softdelete', auth.authenticateJwt(), songController.song_softdelete_patch);
router.patch('/songs/:songId/softundelete', auth.authenticateJwt(), songController.song_softundelete_patch);

router.get('/posts', postController.get_posts);
router.get('/posts/:postId', postController.get_post);
router.post('/posts', auth.authenticateJwt(), postController.post_create_post);
router.get('/posts/:postId/update', auth.authenticateJwt(), postController.post_update_get);
router.put('/posts/:postId', auth.authenticateJwt(), postController.post_update_put);
router.delete('/posts/:postId', auth.authenticateJwt(), postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', auth.authenticateJwt(), postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', auth.authenticateJwt(), postController.post_softundelete_patch);


router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;