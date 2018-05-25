import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import PlaylistEdit from '../../components/playlist/PlaylistEdit';

class PlaylistEditPage extends Component {

	componentDidMount() {
		if (!store.getState().auth.isAuthenticated) {
			this.props.history.push('/login')
		}

	}

	render() {
		return (
			<main>
				<PlaylistEdit history={this.props.history} playlistId={this.props.match.params.id} />
			</main>
		)
	}
}

export default (PlaylistEditPage);