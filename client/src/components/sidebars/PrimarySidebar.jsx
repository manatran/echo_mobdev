import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../../store';

class PrimarySidebar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (store.getState().auth.isAuthenticated) {
			const { classes } = this.props;
			return (
				<aside className="sidebar">
					<section className="header" style={{ backgroundImage: 'url(' + store.getState().auth.user.user.banner || 'https://tse2.mm.bing.net/th?id=OIP.KlkdXEtiARSSjWVEYlQtJwHaFB&pid=Api' + ')' }}>
					</section>
					<section className="user card round-bottom">
						<img src={store.getState().auth.user.user.picture} alt="User" />
						<h2>
							<a href={`/profile/${store.getState().auth.user.user.id}`}>{store.getState().auth.user.user.username}</a>
						</h2>
						<p className="description">{store.getState().auth.user.user.bio}</p>
						<div className="stats">
							<span className="likes">
								<em>12.400</em> Likes</span>
							<span className="posts">
								<em>13</em> Posts</span>
						</div>
						<a className="action-btn" href={`/settings`}>edit profile</a>
					</section>
				</aside>
			);
		}
		else {
			return null;
		}
	}
}

export default PrimarySidebar;