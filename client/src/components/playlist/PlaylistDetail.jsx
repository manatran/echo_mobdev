import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class PlaylistDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playlist: undefined
		}
	}

	componentWillMount() {
		fetch(`/api/v1/playlists/detail/${this.props.playlistId}`)
			.then(response => response.json())
			.then(item => this.setState({ playlist: item }));
	}

	render() {
		if (this.state.playlist) {
			return (
				<div>
					<section className="playlist-header" style={{ backgroundImage: `url(${this.state.playlist.image })` }}>
						<div className="content">
							<img src={this.state.playlist.image} alt={this.state.playlist.title} />
							<h2>{this.state.playlist.title}</h2>
							<p>by <a href={`/profile/${this.state.playlist.author._id}`}>{this.state.playlist.author.username}</a></p>
						</div>
					</section>
					<section className="card playlist round-bottom">
						<p>{this.state.playlist.description}</p>
						{(this.state.playlist.author._id == store.getState().auth.user.user._id) && <a href={`/playlist/edit/${this.state.playlist._id}`} className="action-btn">edit playlist</a>}
					</section>

					<section className="card playlists">
						<h2>Tracklist</h2>
						{(this.state.playlist.songs.length > 0)
							? this.state.playlist.songs.map((song, i) => (
								<a href={`https://open.spotify.com/track/${song.spotify_id}`} target="_blank" key={song.spotify_id}>
									<div className="playlist-item" >
										<img src={song.images && song.images[0].url} alt="Thumbnail" />
										<div>
											<h3>{song.title}</h3>
											<p>{song.artist_name}</p>
										</div>
									</div>
								</a>
							))
							: <p>There are no songs in the playlist.</p>
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

export default PlaylistDetail;