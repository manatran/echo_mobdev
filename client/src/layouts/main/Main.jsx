import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';

/*
Material UI
*/
import './Main.css';

/*
Components
*/
import Header from '../../components/header/Header';
import Offcanvas from '../../components/offcanvas';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import PostPage from '../../pages/post-page/PostPage';
import PostsPage from '../../pages/posts-page/PostsPage';
import SignInPage from '../../pages/sign-in-page/SignInPage';
import SignOutPage from '../../pages/sign-out-page/SignOutPage';
import SignupPage from '../../pages/signup-page/SignupPage';

import PostCreatePage from '../../pages/post-create-page/PostCreatePage';
import PostsTablePage from '../../pages/posts-table-page/PostsTablePage';

class Main extends Component {
  render() {    
    return (
      <div>
        <Offcanvas />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Redirect from="/home" to="/"/>
          <Route exact path='/posts' component={PostsPage}/>
          <Route path='/posts/:id' component={PostPage}/>
          <Route path='/signin' component={SignInPage}/>
          <Route path='/signout' component={SignOutPage}/>
          <Route path='/signup' component={SignupPage}/>
          <Route path='/backoffice/posts-table' component={PostsTablePage}/>
          <Route path='/backoffice/post-create' component={PostCreatePage}/>
          <Route path="*" component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
