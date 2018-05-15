import React, { Component } from 'react';

class SignUp extends Component {

	render() {
		return (
			<section className="card login">
				<img src="/logo.png" />
				Let It Resonate
				<form >
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<input type="password" name="password2" placeholder="Confirm password" />
					<input type="submit" value="Sign up" />
				</form>
				<p>Already have an account? <a href="/signin">Log in here!</a></p>
			</section>
		);
	}
}

export default SignUp;