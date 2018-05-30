import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class SignUp extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			errors: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			errors: ''
		};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		return (
			<section className="card login">
				<img src="/logo.png" alt="Logo" />
				Let It Resonate
				<form noValidate onSubmit={this.onSubmit}>
				<p className="error light">{this.state.errors}</p>
					<label>
						<i className="fas fa-envelope"></i>
						<input
							type="email" name="email" placeholder="E-mail"
							value={this.state.email}
							onChange={this.onChange} />
					</label>
					<label>
						<i className="fas fa-user"></i>
						<input
							type="text" name="username" placeholder="Username"
							value={this.state.username}
							onChange={this.onChange} />
					</label>
					<label>
						<i className="fas fa-unlock-alt"></i>
						<input
							type="password" name="password" placeholder="Password"
							value={this.state.password}
							onChange={this.onChange} />
					</label>
					<label>
						<i className="fas fa-unlock-alt"></i>
						<input
							type="password" name="password2" placeholder="Confirm password"
							value={this.state.password2}
							onChange={this.onChange} />
					</label>
					<input type="submit" value="Sign up" />
				</form>
				<p>Already have an account? <a href="/signin">Log in here!</a></p>
			</section>
		);
	}
}

SignUp.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));