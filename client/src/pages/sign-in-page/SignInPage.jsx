import React, { Component } from 'react';

/*
Components
*/
import SignIn from '../../components/sign-in/SignIn';

/*
Component styles
*/
import './SignInPage.css';

class SignInPage extends Component {
  render() {
    return (
      <main>
				<SignIn history={this.props.history}/>
			</main>
    )
  }
}

export default (SignInPage);