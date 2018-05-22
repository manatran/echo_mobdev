import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class PlaylistList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playlists: undefined
		}
	}

	componentWillMount() {
		fetch(`/api/v1/playlists`, {headers: {Authorization: store.getState().auth.user.token}})
			.then(response => response.json())
			.then(item => this.setState({ playlists: item }));
	}

	render() {
		if (this.state.playlists) {
			return (
				<div>
					<section className="card playlists">
						<h2>Playlists</h2>
						{(this.state.playlists.length > 0)
							? this.state.playlists.map((playlist, i) => (
								<a href={`/playlist/${playlist._id}`}>
								<div className="playlist-item" key={playlist._id}>
									<img src={playlist.image} alt="Thumbnail" />
									<div>
										<h3>{playlist.title}</h3>
										<p>
											{playlist.songs.map((song, i) => <React.Fragment key={i}>
												{!!i && ", "}
												{song.artist_name}
											</React.Fragment>)}
										</p>
									</div>
								</div>
								</a>
							))
							: <section className="light">no playlists found</section>
						}
					</section>
				</div>
			);
		} else {
			return (
				<div>
					<Spinner />
				</div>
			)
		}
	}
}

export default PlaylistList;