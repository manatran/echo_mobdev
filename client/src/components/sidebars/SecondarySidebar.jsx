import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SecondarySidebar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;
		return (
			<aside className="sidebar">
				<section className="card links">
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
				</section>
			</aside>
		);
	}
}

export default SecondarySidebar;