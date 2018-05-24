import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import PlaylistDetail from '../../components/playlist/PlaylistDetail';

class PlaylistDetailPage extends Component {
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
				<PlaylistDetail history={this.props.history} playlistId={this.props.match.params.id} />
			</main>
		)
	}
}

export default (PlaylistDetailPage);