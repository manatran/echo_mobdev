import React, { Component } from 'react';
import store from '../../store';

/*
Components
*/
import ProfileDetail from '../../components/profile-detail/ProfileDetail';

class PostPage extends Component {
  constructor(props) {
    super(props);
	}
	
	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
  }

  render() {
    return (
      <main>
        <ProfileDetail profileId={ this.props.match.params.id }/>
      </main>
    )
  }
}

export default (PostPage);