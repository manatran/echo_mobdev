import React, { Component } from 'react';
import store from '../../store';

/*
Components
*/
import PostDetail from '../../components/post-detail/PostDetail';

class PostPage extends Component {
	
	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
  }

  render() {
    return (
      <main>
        <PostDetail history={this.props.history} postId={ this.props.match.params.id }/>
      </main>
    )
  }
}

export default (PostPage);