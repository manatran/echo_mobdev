import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner';
import utils from '../../utilities/functions';

class PlaylistDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playlist: undefined
		}
	}

	removeSong(songId) {
		const body = {
			song: songId
		}
		console.log(JSON.stringify(body))
		fetch(`/api/v1/playlists/removesong/${this.props.playlistId}`,
			{
				method: 'PATCH',
				headers: { 'content-type': 'application/json', Authorization: store.getState().auth.user.token },
				body: JSON.stringify(body)
			})
			.then(window.location = window.location)
			.catch(err => console.log(err));
	}

	componentWillMount() {
		fetch(`/api/v1/playlists/detail/${this.props.playlistId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => {
				item.songs.sort(utils.sort_by('title', false, (a) => a.toUpperCase()))
				this.setState({ playlist: item })
			});
	}

	render() {
		if (this.state.playlist) {
			return (
				<div>
					<section className="playlist-header round-top" style={{ backgroundImage: `url(${this.state.playlist.image})` }}>
						<div className="content">
							<img src={this.state.playlist.image} alt={this.state.playlist.title} />
							<h2>{this.state.playlist.title}</h2>
							<p>by <a href={`/profile/${this.state.playlist.author._id}`}>{this.state.playlist.author.username}</a></p>
						</div>
					</section>
					<section className="card playlist round-bottom">
						<p>{this.state.playlist.description}</p>
						{(this.state.playlist.author._id === store.getState().auth.user.user._id) && <a href={`/playlist/edit/${this.state.playlist._id}`} className="action-btn">edit playlist</a>}
					</section>

					<section className="card playlists">
						<h2>Tracklist</h2>
						{(this.state.playlist.songs[0].title && this.state.playlist.songs.length > 0)
							? this.state.playlist.songs.map((song, i) => (

								<div className="playlist-item" key={song.spotify_id}>
									<a href={`https://open.spotify.com/track/${song.spotify_id}`} target="_blank">
										<img src={song.images && song.images[0].url} alt="Thumbnail" />
										<div>
											<h3>{song.title}</h3>
											<p>{song.artist_name}</p>
										</div>
									</a>
									{this.state.playlist.author._id === store.getState().auth.user.user._id
										? <span onClick={() => this.removeSong(song.spotify_id)}>
											<i className="fas fa-times"></i>
										</span>
										: null}
								</div>
							))
							: <section className="light">
								<p>There are no songs in the playlist yet. Find songs on the Music page to add.</p>
							</section>
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