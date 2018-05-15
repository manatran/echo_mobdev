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
			content: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value })
	}

	onSubmit(e){
		e.preventDefault()
		const comment = {
			post_id: this.props.postId,
			content: this.state.content,
			author: store.getState().auth.user.user.id
		}
		this.props.createComment(comment)
		document.querySelector('.comment-form form textarea').value = '';
	}

	componentDidMount() {
		fetch(`/api/v1/posts/${this.props.postId}`)
			.then(response => response.json())
			.then(item => this.setState({ post: item }));
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
								<p>by <span className="author">{this.state.post.author.username}</span>
									<time className="timestamp" title={utils.formatDate(this.state.post.created_at)} dateTime={utils.formatDate(this.state.post.created_at)}>{utils.getTimeDifference(this.state.post.created_at)}</time>
								</p>
							</div>
							<div className="actions">
								<span className="likes"><i className="fa fa-heart"></i>{this.state.post.likes.length}</span>
								<span className="comments"><i className="fa fa-comments"></i>250</span>
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