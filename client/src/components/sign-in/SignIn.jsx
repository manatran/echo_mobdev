import React, { Component } from 'react';

class SignIn extends Component {

  render() {
    return (
    	<section className="card login">
				<form action="">
					<input type="text" name="username" placeholder="Username"/>
					<input type="password" name="password" placeholder="Password"/>
					<input type="submit" value="Login"/>
				</form>
				<p>Don't have an account yet? <a href="/signup">Sign up here!</a></p>
			</section>
    );  
  }
}

export default SignIn;