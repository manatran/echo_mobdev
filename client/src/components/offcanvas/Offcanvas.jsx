import React, { Component } from 'react';
import SecondaryMenu from '../sidebars/SecondaryMenu';
import store from '../../store';

class Offcanvas extends Component {

	render() {
		if (store.getState().auth.isAuthenticated) {
			return (
				<aside className="mobile-nav">
					<img src={store.getState().auth.user.picture} alt="Profile pic" />
					<h2>
						{store.getState().auth.user.isAdmin && <i title="admin" className="fas fa-crown" />}
						<a href={`/profile/${store.getState().auth.user.id}`}>{store.getState().auth.user.username}</a>
					</h2>
					<SecondaryMenu />
				</aside>
			)
		}
		else {
			return null
		}
	}
}

export default Offcanvas;