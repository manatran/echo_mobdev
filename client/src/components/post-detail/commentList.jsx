import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions/commentActions';
import store from '../../store';

import SubcommentForm from './SubcommentForm'

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class CommentList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			parent_id: '',
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
			parent_id: this.state.parentId,
			content: this.state.content,
			author: store.getState().auth.user.id
		}
		this.props.createComment(comment)
		document.querySelector('.comment-form form').reset()
	}

	componentWillMount() {
		this.props.fetchComments(this.props.postId);
	}

	render() {
		if (this.props.comments) {
			return (
				<div>
					{(this.props.comments.length > 0)
						? this.props.comments.map((comment, i) => (
							<section className="card comment-thread" key={comment._id}>
								<div className="comment">
									<h2>{comment.author.username || 'manaus_t'}
										<time className="timestamp" title={utils.formatDate(comment.created_at)} dateTime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
									</h2>
									<p>{comment.content}</p>
									<div className="actions">
										<span className="likes"><i className="fa fa-heart"></i>{comment.likes.length}</span>
										<span className="comments"><i className="fa fa-comments"></i>{comment.subcomments && comment.subcomments.length || 0}</span>
										<span className="share"><i className="fa fa-share"></i>share</span>
									</div>
									<SubcommentForm parentId={comment._id} />
								</div>
								{(comment.subcomments && comment.subcomments.length > 0) &&
									<div className="subcomment-thread">
										{comment.subcomments.map((subcomment, i) => (
											<div className="subcomment" key={subcomment._id}>
												<h2>
													{subcomment.author.username}
													<time className="timestamp" title={utils.formatDate(subcomment.created_at)} dateTime={utils.formatDate(subcomment.created_at)}>{utils.getTimeDifference(subcomment.created_at)}</time>
												</h2>
												<p>{subcomment.content}</p>
												<div className="actions">
													<span className="likes"><i className="fa fa-heart"></i>{subcomment.likes.length}</span>
													<span className="share"><i className="fa fa-share"></i>share</span>
												</div>
											</div>
										))}
									</div>
								}
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

CommentList.propTypes = {
	fetchComments: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	comments: state.comment.comments
})


export default connect(mapStateToProps, { fetchComments })(CommentList);