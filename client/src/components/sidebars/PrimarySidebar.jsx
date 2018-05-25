import React, { Component } from 'react';
import store from '../../store';
import Stats from './Stats';

class PrimarySidebar extends Component {


	render() {

		if (store.getState().auth.isAuthenticated) {
			return (
				<aside className="sidebar">
					<section className="header" style={{ backgroundImage: `url(${store.getState().auth.user.user.banner || 'https://tse2.mm.bing.net/th?id=OIP.KlkdXEtiARSSjWVEYlQtJwHaFB&pid=Api'} )` }}>
					</section>
					<section className="user card round-bottom">
						<img src={store.getState().auth.user.user.picture} alt="User" />
						<h2>
							{store.getState().auth.user.user.isAdmin && <i title="admin" className="fas fa-crown" />}
							<a href={`/profile/${store.getState().auth.user.user.id}`}>{store.getState().auth.user.user.username}</a>
						</h2>
						<p className="description">{store.getState().auth.user.user.bio}</p>
						<Stats />
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