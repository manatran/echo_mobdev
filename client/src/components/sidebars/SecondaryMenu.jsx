import React, { Component } from 'react';

class SecondaryMenu extends Component {

	render() {
		return (
			<div>
				<ul className="primary-links">
					<li>
						<a href="#">
							<i className="fa fa-music"></i>Music</a>
					</li>
					<li>
						<a href="#">
							<i className="fa fa-user"></i>Profile</a>
					</li>
					<li>
						<a href="#">
							<i className="fa fa-play"></i>Playlists</a>
					</li>
				</ul>
				<a href="#" className="nightmode">
					<i className="fa fa-moon"></i>Toggle Night Mode</a>
				<ul className="secondary-links">
					<li>
						<a href="#">Settings</a>
					</li>
					<li>
						<a href="#">Contact us</a>
					</li>
					<li>
						<a href="#">Privacy Policy</a>
					</li>
					<li>
						<a href="#" className="logout">Logout</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default SecondaryMenu;