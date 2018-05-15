import React, { Component } from 'react';
import store from '../../store';

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
	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
		
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