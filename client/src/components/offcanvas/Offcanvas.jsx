import React, { Component } from 'react';
import SecondaryMenu from '../sidebars/SecondaryMenu'

class Offcanvas extends Component {

	render() {
		return (
			<aside className="mobile-nav">
				<img src="https://api.adorable.io/avatars/64/manaus.png" alt="Profile pic" />
				<h2>manaus_t</h2>
				<SecondaryMenu />
			</aside>

		)
	}
}

export default Offcanvas;