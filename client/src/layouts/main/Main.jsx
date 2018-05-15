import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';

/*
Components
*/
import Header from '../../components/header/Header';
import Offcanvas from '../../components/offcanvas/Offcanvas';
import PrimarySidebar from '../../components/sidebars/PrimarySidebar';
import SecondarySidebar from '../../components/sidebars/SecondarySidebar';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import PostPage from '../../pages/post-page/PostPage';
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
				<PrimarySidebar />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Redirect from="/home" to="/"/>
          <Route path='/post/:id' component={PostPage}/>
					<Redirect from="/login" to="/signin" />
          <Route path='/signin' component={SignInPage}/>
					<Redirect from="/register" to="/signup" />
          <Route path='/signup' component={SignupPage}/>
					<Redirect from="/logout" to="/signout" />
          <Route path='/signout' component={SignOutPage}/>
          <Route path='/backoffice/posts-table' component={PostsTablePage}/>
          <Route path='/backoffice/post-create' component={PostCreatePage}/>
          <Route path="*" component={NotFoundPage}/>
        </Switch>
				<SecondarySidebar />
      </div>
    );
  }
}

export default Main;
