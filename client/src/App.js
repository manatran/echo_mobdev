import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
Layouts
*/
import Main from './layouts/main/Main';

/*
Styling
*/
import './styles/normalize.css';
import './styles/styles.css';
import './styles/breakpoints.css';
import './styles/dark.css';

/*
Configuration
*/
import config from './config.json';

/*
State management via Redux
*/
import store from './store';

/*
Auth state
*/
import { AUTHENTICATED, UNAUTHENTICATED, TOGGLE_NIGHTMODE, ADD_NIGHTMODE, REMOVE_NIGHTMODE } from './constants';
const auth = localStorage.getItem('mobdev2_auth');
if (auth) {
	store.dispatch({ type: AUTHENTICATED, payload: JSON.parse(auth) });
} else {
	store.dispatch({ type: UNAUTHENTICATED });
}

let nightmode = JSON.parse(localStorage.getItem('nightmode'))
let body = document.querySelector('html');

if (nightmode) {
	body.classList.add('dark')
	localStorage.setItem('nightmode', 'true')
} else {
	body.classList.remove('dark')
	localStorage.setItem('nightmode', 'false')
}


class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Main />
				</Router>
			</Provider>
		);
	}
}

export default App;
