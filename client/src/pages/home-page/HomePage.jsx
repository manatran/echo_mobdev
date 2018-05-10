import React, { Component } from 'react';

/* Comoponents */
import PostsList from '../../components/posts-list/PostsList';

/*
Component styles
*/
import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <PostsList />
      </main>
    )
  }
}

export default (HomePage);