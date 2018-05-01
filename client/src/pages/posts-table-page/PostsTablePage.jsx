import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import PostsTable from '../../components/posts-table/PostsTable';

/*
Component styles
*/
import './PostsTablePage.css';

class PostsTablePage extends Component {
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