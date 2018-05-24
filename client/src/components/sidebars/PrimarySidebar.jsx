import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../../store';

class PrimarySidebar extends Component {

	constructor(props) {
		super(props);

		this.state = {
			stats: undefined
		}
	}
	componentWillMount() {
		fetch(`/api/v1/user/stats/${store.getState().auth.user.user._id}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ stats: item }));
	}

	render() {
		if (this.state.stats && store.getState().auth.isAuthenticated) {
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
								<em>{this.state.stats.posts}</em> Posts</span>
							<span className="comments">
								<em>{this.state.stats.comments}</em> Comments</span>
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