import React, { Component } from 'react';
import SecondaryMenu from './SecondaryMenu';
import store from '../../store';

class SecondarySidebar extends Component {

	render() {
		if (store.getState().auth.isAuthenticated) {
			const { classes } = this.props;
			return (
				<aside className="sidebar">
					<section className="card links">
						<SecondaryMenu />
					</section>
				</aside>
			);
		}
		else {
			return null;
		}
	}
}

export default SecondarySidebar;