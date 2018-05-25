import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import PlaylistList from '../../components/playlist/PlaylistList';

class PlaylistPage extends Component {

	componentDidMount() {
		if (!store.getState().auth.isAuthenticated) {
			this.props.history.push('/login')
		}
	}

	render() {
		return (
			<main>
				<PlaylistList  history={this.props.history}/>
			</main>
		)
	}
}

export default (PlaylistPage);