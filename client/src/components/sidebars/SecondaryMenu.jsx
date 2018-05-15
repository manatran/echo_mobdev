import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleNightmode } from '../../actions/nightmodeActions';

class SecondaryMenu extends Component {
	constructor(props) {
		super(props);

		this.handleToggleNightmode = this.handleToggleNightmode.bind(this);
	}

	handleToggleNightmode(e) {
		e.preventDefault()
		this.props.nightmodeClick()
	}

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
				<a href="#" className="nightmode" onClick={this.handleToggleNightmode}>
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
						<a href="/logout" className="logout">Logout</a>
					</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		nightmode: state.nightmode.nightmode
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    nightmodeClick: () => dispatch(toggleNightmode())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SecondaryMenu);