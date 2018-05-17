import React, { Component } from 'react';
import utils from '../../utilities/functions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleNightmode } from '../../actions/nightmodeActions';
import { setCurrentUser } from '../../actions/authActions';
import store from '../../store';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bio: '',
			picture: '',
			banner: '',
			user: undefined
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.handleToggleNightmode = this.handleToggleNightmode.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		let body = {
			bio: ''
		}
		if (this.state.bio) body.bio = this.state.bio 
		fetch(`/api/v1/user/edit/${this.state.user._id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then((user) => {
				localStorage.setItem('mobdev2_auth', JSON.stringify(user))
				store.dispatch(setCurrentUser(user))
				window.location = `/profile/${this.state.user._id}`
			})
	}

	handleToggleNightmode(e) {
		e.preventDefault()
		this.props.nightmodeClick()
	}

	componentDidMount() {
		this.setState({bio: store.getState().auth.user.bio})
		this.setState({user: store.getState().auth.user})
	}

	render() {
		return (
			<div>
				<section className="card settings">
				<h2>Settings</h2>
				<a href="#" className="nightmode" onClick={this.handleToggleNightmode}>
					<i className="fa fa-moon"></i>Toggle Night Mode</a>
					<form onSubmit={this.onSubmit}>
						<textarea name="bio" onChange={this.onChange} value={this.state.bio}></textarea>
						<input type="submit" value="Save changes"/>
					</form>
				</section>
				<section className="card light">
					<p>If you save your settings and don't see changes immediately, please try logging out and back in again.</p>
				</section>
			</div>
		)
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


export default connect(mapStateToProps, mapDispatchToProps)(Settings);