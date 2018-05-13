import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class PostsList extends Component {
	
	componentWillMount(){
		this.props.fetchPosts();
	}

	render() {
		if (this.props.posts) {
			return (
				<div>
					{this.props.posts.map((element, i) => (
						<section className="card post" key={element._id}>
							{(element.type !== 'song')
								? <a className="thumbnail-link" href={`https://open.spotify.com/${element.type}/${element.content.spotify_id}`} target="_blank">{(element.content && element.content.images)
									? <div className="post-thumbnail" style={{ backgroundImage: 'url(' + element.content.images[0].url + ')' }}>
										<div className="overlay round-left">
											<i className="fab fa-spotify"></i>
										</div>
									</div>
									: <div className="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${element.title}.png)' }}>
										<div className="overlay round-left">
											<i className="fab fa-spotify"></i>
										</div>
									</div>
								}

								</a>
								: <a className="thumbnail-link" href={`https://open.spotify.com/track/${element.content.spotify_id}`} target="_blank">{(element.content && element.content.images)
									? <div className="post-thumbnail" style={{ backgroundImage: 'url(' + element.content.images[0].url + ')' }}>
										<div className="overlay round-left">
											<i className="fab fa-spotify"></i>
										</div>
									</div>
									: <div className="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${element.title}.png)' }}>
										<div className="overlay round-left">
											<i className="fab fa-spotify"></i>
										</div>
									</div>
								}
								</a>}

							<a className="post-link" href={`/post/${element._id}`} key={element._id}>
								<div className="post-body">
									<div className="post-info">
										<h2>
											{(() => {
												switch (element.type) {
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
											{element.content.title}
											{element.content.explicit && <span className="explicit">explicit</span>}
										</h2>
										{element.type !== "song" &&
											<h3>
												{element.content.artist_name}
											</h3>
										}
										{element.type === "song" &&
											<h3>
												{element.content.artist_name}
											</h3>
										}
										<p>by <span className="author">{element.author.username}</span>
											<time className="timestamp" title={utils.formatDate(element.created_at)} dateTime={utils.formatDate(element.created_at)}>{utils.getTimeDifference(element.created_at)}</time>
										</p>
									</div>
									<div className="actions">
										<span className="likes"><i className="fa fa-heart"></i>{element.likes.length}</span>
										<span className="comments"><i className="fa fa-comments"></i>250</span>
									</div>
								</div>
							</a>
						</section>
					))}
					<section className="light" style={{paddingBottom: 16 + 'px'}}>
						<p>That's it, no more posts! You could always create more if you want.</p>
						<a href="#" id="scroll-top">Back to top <i className="fas fa-level-up-alt"></i></a>
					</section>
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

PostsList.propTypes = {
	fetchPosts: PropTypes.func.isRequired,
	posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	posts: state.post.posts
})


export default connect(mapStateToProps, { fetchPosts })(PostsList);