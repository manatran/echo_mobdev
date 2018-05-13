import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class PostsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: null
		}
	}

	componentDidMount() {
		fetch('/api/v1/posts')
			.then(response => response.json())
			.then((item) => {
				this.setState({ posts: item })
			});
	}

	render() {
		const { classes } = this.props;
		if (this.state.posts) {
			return (
				<div>
					{this.state.posts.map((element, i) => (
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
					<section className="light">
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
export default PostsList;