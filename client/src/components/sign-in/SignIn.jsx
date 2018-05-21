import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, loginFacebook } from '../../actions/authActions';
import FacebookLogin from 'react-facebook-login';

import config from '../../config';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	facebookResponse = response => {
		this.props.loginFacebook(response.accessToken, this.props.history)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		
    const { errors } = this.state;
		return (
			<section className="card login">
				<img src="/logo.png" />
				Let It Resonate

				<form onSubmit={this.onSubmit}>
					<label>
						<i className="fas fa-envelope"></i>
						<input
							type="email" name="email" placeholder="E-mail address"
							value={this.state.email}
              onChange={this.onChange}/>
					</label>
					<label>
						<i className="fas fa-unlock-alt"></i>
						<input
							type="password" name="password" placeholder="Password"
							value={this.state.password}
              onChange={this.onChange}/>
					</label>

					<input type="submit" value="Login" />
					
					<FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse} />
				</form>
				<p>Don't have an account yet? <a href="/signup">Sign up here!</a></p>
			</section>
		);
	}
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (userData, history) => dispatch(loginUser(userData, history)),
		loginFacebook: (accessToken, history) => dispatch(loginFacebook(accessToken, history))
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
