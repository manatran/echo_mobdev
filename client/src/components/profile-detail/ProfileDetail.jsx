import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner';

class ProfileDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profile: undefined,
			playlists: [],
			stats: undefined
		}
		this.createChat = this.createChat.bind(this)
	}

	createChat() {
		const body = {
			members: [
				this.state.profile._id,
				store.getState().auth.user.user._id
			]
		}
		fetch(`/api/v1/chats/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(res => window.location = `/messages/${res._id}`);
	}

	componentWillMount() {
		fetch(`/api/v1/user/${this.props.profileId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ profile: item }));

		fetch(`/api/v1/user/stats/${this.props.profileId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ stats: item }));

		fetch(`/api/v1/playlists/${this.props.profileId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ playlists: item }));
	}

	render() {
		if (this.state.profile && this.state.stats) {
			return (
				<div>
					<div className="banner" style={{ backgroundImage: 'url(' + this.state.profile.banner + ')' }}></div>
					<section className="card user profile round-bottom">
						<div className="stats">
							<span className="posts"><em>{this.state.stats.posts}</em> Posts</span>
							<img src={this.state.profile.picture} alt={this.state.profile.username} />
							<span className="comments"><em>{this.state.stats.comments}</em> Comments</span>
						</div>
						<section className="info">
							<div>
								<h2>{this.state.profile.isAdmin && <i title="admin" className="fas fa-crown" />}{this.state.profile.username}</h2>
								<p className="description">{this.state.profile.bio}</p>
							</div>
							{this.state.profile._id !== store.getState().auth.user.user._id &&
								<div className="light" onClick={this.createChat}>
									Send a message
								<i className="fas fa-comments"></i>
								</div>}
						</section>
						{(this.state.profile._id === store.getState().auth.user.user._id) &&
							<a className="action-btn" href={`/settings`}>edit profile</a>
						}
					</section>

					<section className="card playlists">
						<h2>Playlists by {this.state.profile.username}</h2>
						{(this.state.playlists.length > 0)
							? this.state.playlists.map((playlist, i) => (
								<a href={`/playlist/${playlist._id}`} key={playlist._id}>
									<div className="playlist-item" >
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
							: <p>No playlists yet!</p>
						}
					</section>
				</div >
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

export default ProfileDetail;