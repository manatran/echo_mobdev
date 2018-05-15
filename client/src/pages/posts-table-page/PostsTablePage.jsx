import React, { Component } from 'react';
import store from '../../store';

/*
Components
*/
import PostsTable from '../../components/posts-table/PostsTable';

/*
Component styles
*/
import './PostsTablePage.css';

class PostsTablePage extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <PostsTable />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (PostsTablePage);