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
const commentController = require('./controllers/commentController');
const subcommentController = require('./controllers/subcommentController');
const playlistController = require('./controllers/playlistController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');
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
router.delete('/albums/:albumId', albumController.album_delete_delete);
router.patch('/albums/:albumId/softdelete', albumController.album_softdelete_patch);
router.patch('/albums/:albumId/softundelete', albumController.album_softundelete_patch);

router.get('/artists', artistController.get_artists);
router.get('/artists/:artistId', artistController.get_artist);
router.post('/artists', artistController.artist_create_artist);
router.delete('/artists/:artistId', artistController.artist_delete_delete);
router.patch('/artists/:artistId/softdelete', artistController.artist_softdelete_patch);
router.patch('/artists/:artistId/softundelete', artistController.artist_softundelete_patch);

router.get('/songs', songController.get_songs);
router.get('/songs/:songId', songController.get_song);
router.post('/songs', songController.song_create_song);
router.delete('/songs/:songId', songController.song_delete_delete);
router.patch('/songs/:songId/softdelete', songController.song_softdelete_patch);
router.patch('/songs/:songId/softundelete', songController.song_softundelete_patch);

router.get('/comments', commentController.get_comments);
router.get('/comments/:postId', commentController.get_comments_by_post);
router.post('/comments', commentController.comment_create_comment);
router.put('/comments/:commentId', commentController.comment_update_put);
router.delete('/comments/:commentId', commentController.comment_delete_delete);
router.patch('/comments/:commentId/softdelete', commentController.comment_softdelete_patch);
router.patch('/comments/:commentId/softundelete', commentController.comment_softundelete_patch);

router.get('/subcomments', subcommentController.get_subcomments);
router.get('/subcomments/:parentId', subcommentController.get_subcomments_by_parent);
router.post('/subcomments', subcommentController.subcomment_create_subcomment);
router.put('/subcomments/:subcommentId', subcommentController.subcomment_update_put);
router.delete('/subcomments/:subcommentId', subcommentController.subcomment_delete_delete);
router.patch('/subcomments/:subcommentId/softdelete', subcommentController.subcomment_softdelete_patch);
router.patch('/subcomments/:subcommentId/softundelete', subcommentController.subcomment_softundelete_patch);

router.get('/playlists', playlistController.get_playlists);
router.get('/playlists/:playlistId', playlistController.get_playlist);
router.post('/playlists', playlistController.playlist_create_playlist);
router.put('/playlists/:playlistId', playlistController.playlist_update_put);
router.delete('/playlists/:playlistId', playlistController.playlist_delete_delete);
router.patch('/playlists/:playlistId/softdelete', playlistController.playlist_softdelete_patch);
router.patch('/playlists/:playlistId/softundelete', playlistController.playlist_softundelete_patch);

router.get('/chats', chatController.get_chats);
router.get('/chats/:chatId', chatController.get_chat);
router.post('/chats', chatController.chat_create_chat);
router.put('/chats/:chatId', chatController.chat_update_put);
router.delete('/chats/:chatId', chatController.chat_delete_delete);
router.patch('/chats/:chatId/softdelete', chatController.chat_softdelete_patch);
router.patch('/chats/:chatId/softundelete', chatController.chat_softundelete_patch);

router.get('/messages', chatController.get_chats);
router.get('/messages/:chatId', chatController.get_chat);
router.post('/messages', chatController.chat_create_chat);
router.put('/messages/:messageId', chatController.chat_update_put);
router.delete('/messages/:messageId', chatController.chat_delete_delete);
router.patch('/messages/:messageId/softdelete', chatController.chat_softdelete_patch);
router.patch('/messages/:messageId/softundelete', chatController.chat_softundelete_patch);

router.get('/posts', postController.get_posts);
router.get('/posts/:postId', postController.get_post);
router.post('/posts', postController.post_create_post);
router.delete('/posts/:postId', postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', postController.post_softundelete_patch);


router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;