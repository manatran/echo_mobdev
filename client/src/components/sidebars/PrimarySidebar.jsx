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
							{store.getState().auth.user.user.isAdmin && <i title="admin" className="fas fa-crown" />}
							<a href={`/profile/${store.getState().auth.user.user.id}`}>{store.getState().auth.user.user.username}</a>
						</h2>
						<p className="description">{store.getState().auth.user.user.bio}</p>
						<div className="stats">
							<span className="posts">
								<em>12.400</em> Posts</span>
							<span className="comments">
								<em>13</em> Comments</span>
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