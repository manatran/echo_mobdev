import React, { Component } from 'react';
import SignUp from '../../components/sign-up/SignUp';

class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
				<SignUp/>
			</main>
    )
  }
}

export default (SignupPage);