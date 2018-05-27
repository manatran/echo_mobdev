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

router.get('/search/artist/:term', auth.authenticateJwt(), searchController.searchArtist);
router.get('/search/album/:term', auth.authenticateJwt(), searchController.searchAlbum);
router.get('/search/song/:term', auth.authenticateJwt(), searchController.searchSong);

router.get('/albums', auth.authenticateJwt(), albumController.get_albums);
router.get('/albums/:albumId', auth.authenticateJwt(), albumController.get_album);
router.post('/albums', auth.authenticateJwt(), albumController.album_create_album);
router.delete('/albums/:albumId', auth.authenticateJwt(), albumController.album_delete_delete);
router.patch('/albums/:albumId/softdelete', auth.authenticateJwt(), albumController.album_softdelete_patch);
router.patch('/albums/:albumId/softundelete', auth.authenticateJwt(), albumController.album_softundelete_patch);

router.get('/artists', auth.authenticateJwt(), artistController.get_artists);
router.get('/artists/:artistId', auth.authenticateJwt(), artistController.get_artist);
router.post('/artists', auth.authenticateJwt(), artistController.artist_create_artist);
router.delete('/artists/:artistId', auth.authenticateJwt(), artistController.artist_delete_delete);
router.patch('/artists/:artistId/softdelete', auth.authenticateJwt(), artistController.artist_softdelete_patch);
router.patch('/artists/:artistId/softundelete', auth.authenticateJwt(), artistController.artist_softundelete_patch);

router.get('/songs', auth.authenticateJwt(), songController.get_songs);
router.get('/songs/:songId', auth.authenticateJwt(), songController.get_song);
router.post('/songs', auth.authenticateJwt(), songController.song_create_song);
router.delete('/songs/:songId', auth.authenticateJwt(), songController.song_delete_delete);
router.patch('/songs/:songId/softdelete', auth.authenticateJwt(), songController.song_softdelete_patch);
router.patch('/songs/:songId/softundelete', auth.authenticateJwt(), songController.song_softundelete_patch);

router.get('/comments', auth.authenticateJwt(), commentController.get_comments);
router.get('/comments/:postId', auth.authenticateJwt(), commentController.get_comments_by_post);
router.post('/comments', auth.authenticateJwt(), commentController.comment_create_comment);
router.put('/comments/:commentId', auth.authenticateJwt(), commentController.comment_update_put);
router.patch('/comments/like/:commentId', auth.authenticateJwt(), commentController.comment_like_comment);
router.delete('/comments/:commentId', auth.authenticateJwt(), commentController.comment_delete_delete);
router.patch('/comments/:commentId/softdelete', auth.authenticateJwt(), commentController.comment_softdelete_patch);
router.patch('/comments/:commentId/softundelete', auth.authenticateJwt(), commentController.comment_softundelete_patch);

router.get('/subcomments', auth.authenticateJwt(), subcommentController.get_subcomments);
router.get('/subcomments/:parentId', auth.authenticateJwt(), subcommentController.get_subcomments_by_parent);
router.post('/subcomments', auth.authenticateJwt(), subcommentController.subcomment_create_subcomment);
router.put('/subcomments/:subcommentId', auth.authenticateJwt(), subcommentController.subcomment_update_put);
router.patch('/subcomments/like/:subcommentId', auth.authenticateJwt(), subcommentController.subcomment_like_subcomment);
router.delete('/subcomments/:subcommentId', auth.authenticateJwt(), subcommentController.subcomment_delete_delete);
router.patch('/subcomments/:subcommentId/softdelete', auth.authenticateJwt(), subcommentController.subcomment_softdelete_patch);
router.patch('/subcomments/:subcommentId/softundelete', auth.authenticateJwt(), subcommentController.subcomment_softundelete_patch);

router.get('/playlists', auth.authenticateJwt(), playlistController.get_playlists);
router.get('/playlists/:userId', auth.authenticateJwt(), playlistController.get_playlist);
router.get('/playlists/detail/:playlistId', auth.authenticateJwt(), playlistController.get_playlist_by_id);
router.post('/playlists', auth.authenticateJwt(), playlistController.playlist_create_playlist);
router.put('/playlists/:playlistId', auth.authenticateJwt(), playlistController.playlist_update_put);
router.patch('/playlists/addsong/:playlistId', auth.authenticateJwt(), playlistController.playlist_add_song);
router.patch('/playlists/removesong/:playlistId', auth.authenticateJwt(), playlistController.playlist_remove_song);
router.patch('/playlists/edit/:playlistId', auth.authenticateJwt(), playlistController.playlist_edit);
router.delete('/playlists/:playlistId', auth.authenticateJwt(), playlistController.playlist_delete_delete);
router.patch('/playlists/:playlistId/softdelete', auth.authenticateJwt(), playlistController.playlist_softdelete_patch);
router.patch('/playlists/:playlistId/softundelete', auth.authenticateJwt(), playlistController.playlist_softundelete_patch);

router.get('/chats', auth.authenticateJwt(), chatController.get_chats);
router.get('/chats/:chatId', auth.authenticateJwt(), chatController.get_chat);
router.get('/chats/user/:userId', auth.authenticateJwt(), chatController.get_chats_by_user);
router.post('/chats', auth.authenticateJwt(), chatController.chat_create_chat);
router.put('/chats/:chatId', auth.authenticateJwt(), chatController.chat_update_put);
router.delete('/chats/:chatId', auth.authenticateJwt(), chatController.chat_delete_delete);
router.patch('/chats/:chatId/softdelete', auth.authenticateJwt(), chatController.chat_softdelete_patch);
router.patch('/chats/:chatId/softundelete', auth.authenticateJwt(), chatController.chat_softundelete_patch);

router.get('/messages', auth.authenticateJwt(), messageController.get_messages);
router.get('/messages/:chatId', auth.authenticateJwt(), messageController.get_messages_by_chatId);
router.post('/messages', auth.authenticateJwt(), messageController.message_create_message);
router.put('/messages/:messageId', auth.authenticateJwt(), messageController.message_update_put);
router.delete('/messages/:messageId', auth.authenticateJwt(), messageController.message_delete_delete);
router.patch('/messages/:messageId/softdelete', auth.authenticateJwt(), messageController.message_softdelete_patch);
router.patch('/messages/:messageId/softundelete', auth.authenticateJwt(), messageController.message_softundelete_patch);

router.get('/posts', auth.authenticateJwt(), postController.get_posts);
router.get('/posts/:postId', auth.authenticateJwt(), postController.get_post);
router.post('/posts', auth.authenticateJwt(), postController.post_create_post);
router.patch('/posts/like/:postId', auth.authenticateJwt(), postController.post_like_post);
router.delete('/posts/:postId', auth.authenticateJwt(), postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', auth.authenticateJwt(), postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', auth.authenticateJwt(), postController.post_softundelete_patch);

router.get('/user/:userId', authController.get_user);
router.get('/user/stats/:userId', authController.get_user_stats);
router.patch('/user/edit/:userId', authController.edit_user);

router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;