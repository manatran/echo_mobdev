import React, { Component } from 'react';
import SecondaryMenu from './SecondaryMenu';

class SecondarySidebar extends Component {

	render() {
		const { classes } = this.props;
		return (
			<aside className="sidebar">
				<section className="card links">
					<SecondaryMenu />
				</section>
			</aside>
		);
	}
}

export default SecondarySidebar;