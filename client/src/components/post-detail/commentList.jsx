import React, { Component } from 'react';
import utils from '../../utilities/functions';
import SubcommentList from './subCommentList';
import Spinner from '../spinner/Spinner';

class CommentList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			comments: []
		}
	}

	componentDidMount() {
		fetch(`/api/v1/comments/${this.props.postId}`)
			.then(response => response.json())
			.then(item => this.setState({ comments: item }));
	}

	render() {
		if (this.state.comments) {
			return (
				<div>
					{(this.state.comments.length > 0)
						? this.state.comments.map((comment, i) => (
							<section className="card comment-thread" key={comment._id}>
								<div className="comment">
									<h2>{comment.author.username}
										<time className="timestamp" title={utils.formatDate(comment.created_at)} dateTime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
									</h2>
									<p>{comment.content}</p>
									<div className="actions">
										<span className="likes"><i className="fa fa-heart"></i>{comment.likes.length}</span>
										<span className="comments"><i className="fa fa-comments"></i>250</span>
										<span className="share"><i className="fa fa-share"></i>share</span>
									</div>
									<form action="/api/v1/subcomments" method="POST" className="subcomment-form">
										<input type="hidden" name="author" value="5aef46e5bddead379cb44ea4" />
										<input type="hidden" name="parent_id" value={comment._id} />
										<textarea name="content" id="comment" placeholder="Type your comment"></textarea>
										<button type="submit" value="Submit"><i className="fas fa-comment-alt"></i></button>
									</form>
								</div>
								<SubcommentList commentId={comment._id} />
							</section>))
						: <section className="light">No comments yet. Start a discussion by posting a comment.</section>}
				</div>
			)
		} else {
			return (
				<div>
					<Spinner />
				</div>
			)
		}
	}
}

export default CommentList;