import React, { Component } from 'react';
import SecondaryMenu from '../sidebars/SecondaryMenu';
import store from '../../store';

class Offcanvas extends Component {

	render() {
		if (store.getState().auth.isAuthenticated) {
			return (
				<aside className="mobile-nav">
					<img src={store.getState().auth.user.user.picture} alt="Profile pic" />
					<h2><a href={`/profile/${store.getState().auth.user.user.id}`}>{store.getState().auth.user.user.username}</a></h2>
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