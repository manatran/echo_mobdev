import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment } from '../../actions/commentActions'
import store from '../../store';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';
import CommentList from './CommentList';

class PostDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			post: undefined,
			content: '',
			comments: 0
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.deletePost = this.deletePost.bind(this)
		this.likePost = this.likePost.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	deletePost() {
		fetch(`/api/v1/posts/${this.props.postId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(this.props.history.push('/'))
			.catch(err => console.log(err));
	}
	
	likePost(){
		fetch(`/api/v1/posts/like/${this.props.postId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(window.location = window.location)
			.catch(err => console.log(err));
	}

	onSubmit(e) {
		e.preventDefault()
		const comment = {
			post_id: this.props.postId,
			content: this.state.content,
			author: store.getState().auth.user.user.id
		}
		if (this.state.content) this.props.createComment(comment)
		document.querySelector('.comment-form form textarea').value = '';
	}

	componentDidMount() {
		fetch(`/api/v1/posts/${this.props.postId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ post: item }));

		fetch(`/api/v1/comments/${this.props.postId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ comments: item.length }));
	}

	render() {
		if (this.state.post) {
			return (
				<div>
					<section className="card post detail">
						{(this.state.post.type !== 'song')
							? <a className="thumbnail-link" href={`https://open.spotify.com/${this.state.post.type}/${this.state.post.content.spotify_id}`} target="_blank">{(this.state.post.content && this.state.post.content.images)
								? <div className="post-thumbnail" style={{ backgroundImage: 'url(' + this.state.post.content.images[0].url + ')' }}>
									<div className="overlay round-left">
										<i className="fab fa-spotify"></i>
									</div>
								</div>
								: <div className="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${this.state.post.title}.png)' }}>
									<div className="overlay round-left">
										<i className="fab fa-spotify"></i>
									</div>
								</div>
							}

							</a>
							: <a className="thumbnail-link" href={`https://open.spotify.com/track/${this.state.post.content.spotify_id}`} target="_blank">{(this.state.post.content && this.state.post.content.images)
								? <div className="post-thumbnail" style={{ backgroundImage: 'url(' + this.state.post.content.images[0].url + ')' }}>
									<div className="overlay round-left">
										<i className="fab fa-spotify"></i>
									</div>
								</div>
								: <div className="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${this.state.post.title}.png)' }}>
									<div className="overlay round-left">
										<i className="fab fa-spotify"></i>
									</div>
								</div>
							}
							</a>}
						<div className="post-body">
							<div className="post-info">
								{(store.getState().auth.user.user.isAdmin || this.state.post.author._id == store.getState().auth.user.user._id)
									? <div className="options">
										<label>
											<i className="fas fa-ellipsis-v" />
											<input type="checkbox" name="options" value="toggle" />
											<div className="option-list card">
												<span onClick={this.deletePost}>Delete</span>
											</div>
										</label>

									</div>
									: ''}
								<h2>
									{(() => {
										switch (this.state.post.type) {
											case 'song':
												return <i className="fas fa-music" />
											case 'artist':
												return <i className="fas fa-users" />
											case 'album':
												return <i className="fas fa-dot-circle" />
											default:
												null
										}
									})()}
									{this.state.post.content.title}
									{this.state.post.content.explicit && <span className="explicit">explicit</span>}
								</h2>
								{this.state.post.type !== "song" &&
									<h3>{this.state.post.content.artist_name}</h3>
								}
								{this.state.post.type === "song" &&
									<h3>{this.state.post.content.artist_name}</h3>
								}
								<p>by <span className="author"><a href={`/profile/${this.state.post.author._id}`}>{this.state.post.author.isAdmin && <i title="admin" className="fas fa-crown" />}{this.state.post.author.username}</a></span>
									<time className="timestamp" title={utils.formatDate(this.state.post.created_at)} dateTime={utils.formatDate(this.state.post.created_at)}>{utils.getTimeDifference(this.state.post.created_at)}</time>
								</p>
							</div>
							<div className="actions">
								<span onClick={this.likePost} className={`likes ${this.state.post.likes.indexOf(store.getState().auth.user.user._id) > -1
									? 'liked'
									: ''}`}><i className="fa fa-heart"></i>{this.state.post.likes.length}</span>
								<span className="comments"><i className="fa fa-comments"></i>{this.state.comments}</span>
								<span className="share"><i className="fa fa-share"></i>share</span>
							</div>
						</div>
					</section>
					<section className="card comment-form">
						<form onSubmit={this.onSubmit}>
							<textarea name="content" placeholder="Type your comment" onChange={this.onChange} value={this.state.content}></textarea>
							<button type="submit" value="Submit"><i className="fas fa-comment-alt"></i></button>
						</form>
					</section>

					<CommentList postId={this.props.postId} />

				</div>
			);
		} else {
			return (
				<div>
					<Spinner />
				</div>
			)
		}
	}
}

PostDetail.propTypes = {
	createComment: PropTypes.func.isRequired
}

export default connect(null, { createComment })(PostDetail);