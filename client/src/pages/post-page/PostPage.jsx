import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import PostDetail from '../../components/post-detail/PostDetail';

/*
Component styles
*/
import './PostPage.css';

class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <PostDetail postId={ this.props.match.params.id }/>
      </main>
    )
  }
}

export default (PostPage);