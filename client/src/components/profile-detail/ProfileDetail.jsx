import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class ProfileDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profile: undefined,
			playlists: []
		}
	}

	componentWillMount() {
		fetch(`/api/v1/user/${this.props.profileId}`)
			.then(response => response.json())
			.then(item => this.setState({ profile: item }));

		fetch(`/api/v1/playlists/${this.props.profileId}`)
			.then(response => response.json())
			.then(item => this.setState({ playlists: item }));
	}

	render() {
		if (this.state.profile) {
			return (
				<div>
					<div className="banner" style={{ backgroundImage: 'url(' + this.state.profile.banner + ')' }}></div>
					<section className="card user profile round-bottom">
						<div className="stats">
							<span className="likes"><em>12.400</em> Likes</span>
							<img src={this.state.profile.picture} alt={this.state.profile.username} />
							<span className="posts"><em>13</em> Posts</span>
						</div>
						<h2>{this.state.profile.username}</h2>
						<p className="description">{this.state.profile.bio}</p>
						{(this.state.profile._id == store.getState().auth.user._id) && 
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

export default ProfileDetail;