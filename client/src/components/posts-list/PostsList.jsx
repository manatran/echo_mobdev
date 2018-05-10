import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: null
		}
	}

	millisToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
	getTimeDifference(datetime) {
		var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

		var datetime = new Date(datetime).getTime();
		var now = new Date().getTime();

		if (isNaN(datetime)) {
			return "";
		}

		if (datetime < now) {
			var milisec_diff = now - datetime;
		} else {
			var milisec_diff = datetime - now;
		}

		var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
		var date_diff = new Date(milisec_diff);
		if (days < 1) return `${date_diff.getHours()} hours ago`;
		if (days >= 1) return `${days} days ago`;
	}
	formatDate(datetime) {
		datetime = new Date(datetime)
		return `${datetime}`
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
						<a href={`/post/${element._id}`} key={element._id}>
							<section class="card post">
							{(element.content && element.content.images)
								? <div class="post-thumbnail" style={{ backgroundImage: 'url(' + element.content.images[0].url + ')' }}></div>
								: <div class="post-thumbnail" style={{ backgroundImage: 'url(https://api.adorable.io/avatars/128/${element.title}.png)' }}></div>
								}
								<div class="post-body">
									<div class="post-info">
										<h2>
											{(() => {
												switch (element.type) {
													case 'song':
														return <i class="fas fa-music" />
													case 'artist':
														return <i class="fas fa-users" />
													case 'album':
														return <i class="fas fa-dot-circle" />
													default:
														null
												}
											})()}
											{element.content.title}
											{element.content.explicit && <span class="explicit">explicit</span>}
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
										<p>by <span class="author">{element.author.username}</span>
											<time class="timestamp" title={this.formatDate(element.created_at)} datetime={this.formatDate(element.created_at)}>{this.getTimeDifference(element.created_at)}</time>
										</p>
									</div>
									<div class="actions">
										<span class="likes">
											<i class="fa fa-heart"></i>{element.likes.length}</span>
										<span class="comments">
											<i class="fa fa-comments"></i>250</span>
										<span class="share">
											<i class="fa fa-share"></i>share</span>
									</div>
								</div>
							</section>
						</a>
					))}
				</div>
			);
		} else {
			return (
				<div>

				</div>
			)
		}
	}
}
export default PostsList;