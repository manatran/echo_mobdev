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
		this.likeComment = this.likeComment.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		const comment = {
			parent_id: this.state.parentId,
			content: this.state.content,
			author: store.getState().auth.user.user.id
		}
		this.props.createComment(comment)
		document.querySelector('.comment-form form').reset()
	}

	deleteComment(commentId, type) {
		fetch(`/api/v1/${type}/${commentId}/softdelete`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(window.location = window.location)
			.catch(err => console.log(err));
	}
	restoreComment(commentId, type) {
		fetch(`/api/v1/${type}/${commentId}/softundelete`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(window.location = window.location)
			.catch(err => console.log(err));
	}
	likeComment(commentId){
		fetch(`/api/v1/comments/like/${commentId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(response => response.json())
			.then(window.location = window.location)
			.catch(err => console.log(err));
	}
	likeSubcomment(subcommentId){
		fetch(`/api/v1/subcomments/like/${subcommentId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			}
		})
			.then(response => response.json())
			.then(window.location = window.location)
			.catch(err => console.log(err));
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
									{(store.getState().auth.user.user.isAdmin || comment.author._id === store.getState().auth.user.user._id)
										? <div className="options">
											<label>
												<i className="fas fa-ellipsis-v" />
												<input type="checkbox" name="options" value="toggle" />
												<div className="option-list card">
													{comment.deleted_at && comment.author.isAdmin
														? <span onClick={() => this.restoreComment(comment._id, 'comments')}>restore</span>
														: <span onClick={() => this.deleteComment(comment._id, 'comments')}>Delete</span>
													}
												</div>
											</label>

										</div>
										: ''}
									<h2 className="author">{comment.author.isAdmin && <i title="admin" className="fas fa-crown" />}{comment.author.username || store.getState().auth.user.user.username}
										<time className="timestamp" title={utils.formatDate(comment.created_at)} dateTime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
									</h2>
									<p>{comment.deleted_at ? '[DELETED]' : comment.content}</p>
									<div className="actions">
										<span onClick={() => this.likeComment(comment._id)} className={`likes ${comment.likes.indexOf(store.getState().auth.user.user._id) > -1
										? 'liked'
										: ''}`}><i className="fa fa-heart"></i>{comment.likes.length}</span>
										<span className="comments"><i className="fa fa-comments"></i>{(comment.subcomments && comment.subcomments.length) || 0}</span>
									</div>
									<SubcommentForm parentId={comment._id} />
								</div>
								{(comment.subcomments && comment.subcomments.length > 0) &&
									<div className="subcomment-thread">
										{comment.subcomments.map((subcomment, i) => (
											<div className="subcomment" key={subcomment._id}>
												{(store.getState().auth.user.user.isAdmin || subcomment.author._id === store.getState().auth.user.user._id)
													? <div className="options">
														<label>
															<i className="fas fa-ellipsis-v" />
															<input type="checkbox" name="options" value="toggle" />
															<div className="option-list card">
																{subcomment.deleted_at
																	? <span onClick={() => this.restoreComment(subcomment._id, 'subcomments')}>restore</span>
																	: <span onClick={() => this.deleteComment(subcomment._id, 'subcomments')}>Delete</span>
																}
															</div>
														</label>

													</div>
													: ''}
												<h2 className="author">
													{subcomment.author.isAdmin && <i title="admin" className="fas fa-crown" />}{subcomment.author.username}
													<time className="timestamp" title={utils.formatDate(subcomment.created_at)} dateTime={utils.formatDate(subcomment.created_at)}>{utils.getTimeDifference(subcomment.created_at)}</time>
												</h2>
												<p>{subcomment.deleted_at ? '[DELETED]' : subcomment.content}</p>
												<div className="actions">
												<span onClick={() => this.likeSubcomment(subcomment._id)} className={`likes ${subcomment.likes.indexOf(store.getState().auth.user.user._id) > -1
									? 'liked'
									: ''}`}><i className="fa fa-heart"></i>{subcomment.likes.length}</span>
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