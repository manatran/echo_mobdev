import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PrimarySidebar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;
		return (
			<aside className="sidebar">
				<section className="header" style={{ backgroundImage: 'url(https://tse2.mm.bing.net/th?id=OIP.KlkdXEtiARSSjWVEYlQtJwHaFB&pid=Api)' }}>
				</section>
				<section className="user card round-bottom">
					<img src="https://api.adorable.io/avatars/64/manaus.png" alt="User" />
					<h2>
						<a href="#">manaus_t</a>
					</h2>
					<p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
				dummy text ever since the 1500s.</p>
					<div className="stats">
						<span className="likes">
							<em>12.400</em> Likes</span>
						<span className="posts">
							<em>13</em> Posts</span>
					</div>
					<a className="action-btn" href="#">edit profile</a>
				</section>
			</aside>
		);
	}
}

export default PrimarySidebar;