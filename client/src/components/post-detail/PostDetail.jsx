import React, { Component } from 'react';
import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class PostDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			post: undefined,
			comments: []
		}
	}

	componentDidMount() {
		fetch(`/api/v1/posts/${this.props.postId}`)
			.then(response => response.json())
			.then(item => this.setState({ post: item }));
		/*fetch(`/api/v1/comments/${this.props.postId}`)
			.then(response => response.json())
			.then(item => this.setState({ comments: item }));*/
	}

	render() {
		if (this.state.post) {
			return (
				<div>
					<section className="card post detail">
						{(this.state.post.content && this.state.post.content.images)
							? <div className="post-thumbnail" style={{ backgroundImage: 'url(' + this.state.post.content.images[0].url + ')' }}></div>
							: <div className="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${this.state.post.title}.png)' }}></div>
						}
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
						<form action={"/api/v1/comments"} method="POST">
							<input type="hidden" name="author" value="5aef46e5bddead379cb44ea4" />
							<input type="hidden" name="post_id" value={this.props.postId} />
							<textarea name="content" id="comment" placeholder="Type your comment"></textarea>
							<button type="submit" value="Submit"><i className="fas fa-comment-alt"></i></button>
						</form>
					</section>
					{
						(this.state.comments.length > 0)
							? this.state.comments.map((comment, i) => (
								<section class="card comment-thread">
									<div className="comment">
										<h2>{comment.author.username}
											<time className="timestamp" title={utils.formatDate(comment.created_at)} datetime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
										</h2>
										<p>{comment.content}</p>
										<div className="actions">
											<span className="likes"><i className="fa fa-heart"></i>{comment.likes.length}</span>
											<span className="comments"><i className="fa fa-comments"></i>250</span>
											<span className="share"><i className="fa fa-share"></i>share</span>
										</div>
									</div>
									<div className="subcomment-thread">
										{this.state.comments.map((subcomment, j) => (
											<div className="subcomment" index={j}>
												<h2>{comment.author.username}µ
												<time className="timestamp" title={utils.formatDate(comment.created_at)} datetime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
												</h2>
												<p>{comment.content}</p>
												<div className="actions">
													<span className="likes"><i className="fa fa-heart"></i>{comment.likes.length}</span>
													<span className="comments"><i className="fa fa-comments"></i>250</span>
													<span className="share"><i className="fa fa-share"></i>share</span>
												</div>
											</div>
										))}
									</div>
								</section>))
							: <section className="card light">No comments yet. Start a discussion by posting a comment.</section>}

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

export default PostDetail;