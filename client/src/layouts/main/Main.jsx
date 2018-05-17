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
import ProfilePage from '../../pages/profile-page/ProfilePage';
import PlaylistPage from '../../pages/playlist-page/PlaylistPage';
import PlaylistDetailPage from '../../pages/playlist-page/PlaylistDetailPage';
import BrowsePage from '../../pages/browse-page/BrowsePage';
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
        <Header history={this.history} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Redirect from="/home" to="/"/>
          <Route path='/post/:id' component={PostPage}/>
          <Route path='/profile/:id' component={ProfilePage}/>
          <Route path='/playlists' component={PlaylistPage}/>
          <Route path='/playlist/:id' component={PlaylistDetailPage}/>
          <Route exact path='/browse' component={BrowsePage}/>
          <Route exact path='/browse/:term' component={BrowsePage}/>
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
