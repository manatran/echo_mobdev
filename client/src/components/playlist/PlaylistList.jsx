import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner';

class PlaylistList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playlists: undefined
		}
		this.createPlaylist = this.createPlaylist.bind(this)
	}

	createPlaylist() {
		const body = {
			title: `${store.getState().auth.user.user.username}'s Playlist`,
			description: `A playlist by ${store.getState().auth.user.user.username}`,
			image: `${store.getState().auth.user.user.picture}`,
			author: `${store.getState().auth.user.user._id}`
		}
		fetch(`/api/v1/playlists`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': store.getState().auth.user.token
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(item => {
				this.props.history.push(`/playlist/edit/${item._id}`)
			})
			.catch(err => console.log(err));
	}

	componentWillMount() {
		fetch(`/api/v1/playlists`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ playlists: item }));
	}

	render() {
		if (this.state.playlists) {
			return (
				<div>
					<section className="card playlists">
						<h2>Playlists</h2>
						<div className="new-playlist" onClick={this.createPlaylist}>
							<i className="fas fa-plus"></i>
							Create playlist
						</div>
						{(this.state.playlists.length > 0)
							? this.state.playlists.map((playlist, i) => (
								<a href={`/playlist/${playlist._id}`} key={playlist._id}>
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