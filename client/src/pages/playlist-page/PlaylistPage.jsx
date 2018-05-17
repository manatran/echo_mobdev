import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import PlaylistList from '../../components/playlist/PlaylistList';

class PlaylistPage extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (!store.getState().auth.isAuthenticated) {
			this.props.history.push('/login')
		}
	}

	render() {
		return (
			<main>
				<PlaylistList />
			</main>
		)
	}
}

export default (PlaylistPage);