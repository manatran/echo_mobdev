import React, { Component } from 'react';
import store from '../../store';
import utils from '../../utilities/functions';

class Music extends Component {

	constructor(props) {
		super(props);
		this.state = {
			songs: '',
			albums: '',
			artists: '',
			playlists: []
		}
	}

	componentWillMount() {
		fetch(`/api/v1/songs`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ songs: item.sort(utils.sort_by('title', false, function (a) { return a.toUpperCase() })) }));

		fetch(`/api/v1/albums`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => {
				this.setState({ albums: item.sort(utils.sort_by('title', false, function (a) { return a.toUpperCase() })) })
			});

		fetch(`/api/v1/artists`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ artists: item.sort(utils.sort_by('title', false, function (a) { return a.toUpperCase() })) }));

		fetch(`/api/v1/playlists/${store.getState().auth.user.user._id}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ playlists: item }));
	}

	componentDidMount() {
		let scrollTop = document.getElementById('scroll-top')
		if (scrollTop) {
			scrollTop.addEventListener('click', (e) => {
				e.preventDefault();
				window.scroll({ top: 0, left: 0, behavior: 'smooth' })
			})

			// active tabs
			let tabs = document.querySelectorAll('.subtabs a');

			for (let i = 0; i < tabs.length; i++) {
				tabs[i].addEventListener('click', (e) => {
					e.preventDefault()

					let active = document.querySelector('.subtabs .active');

					active.classList.remove('active')
					tabs[i].classList.add('active')

					let artists = document.querySelector('.artists')
					let albums = document.querySelector('.albums')
					let songs = document.querySelector('.songs')

					artists.classList.add('hidden')
					albums.classList.add('hidden')
					songs.classList.add('hidden')

					if (tabs[i].innerHTML.toLowerCase() === 'artists') artists.classList.remove('hidden')
					if (tabs[i].innerHTML.toLowerCase() === 'albums') albums.classList.remove('hidden')
					if (tabs[i].innerHTML.toLowerCase() === 'songs') songs.classList.remove('hidden')
				})
			}
		}
	}

	addSong(playlistId, songId) {
		const body = {
			song: songId
		}
		fetch(`/api/v1/playlists/addsong/${playlistId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then((post) => {
				this.props.history.push(`/playlist/${playlistId}`)
			})
			.catch(err => console.log(err))
	}

	onClick(id, type) {
		let newPost = {
			content: id,
			type: type,
			author: store.getState().auth.user.user._id
		}
		fetch(`/api/v1/posts/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			},
			body: JSON.stringify(newPost)
		})
			.then(response => response.json())
			.then((post) => {
				this.props.history.push(`/post/${post._id}`)
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div>

				<section className="card round-top tabs subtabs">
					<div>
						<a className="active">Artists</a>
						<a>Albums</a>
						<a>Songs</a>
					</div>
				</section>

				<section className="card light no-radius">
					<p>Click the content to create a post or use the searchbar to find more content.</p>
				</section>

				<section className="card results round-bottom albums hidden">
					{this.state.albums.length > 0
						? <div>
							{this.state.albums.map((album, i) => (
								<span onClick={() => this.onClick(album.spotify_id, 'album')} key={album.spotify_id}>
									<div className="playlist-item" >
										<img src={album.images && album.images[0].url} alt="Thumbnail" />
										<div>
											<h3>{album.title}</h3>
											<p>{album.artist_name}</p>
										</div>
									</div>
								</span>
							))}
						</div>
						: <section className="light"><p>No albums found</p></section>}
				</section>

				<section className="card results round-bottom songs hidden">
					{this.state.songs.length > 0
						? <div>
							{this.state.songs.map((song, i) => (
								<span key={song.spotify_id}>
									<div className="playlist-item" >
										{song.album && song.album.images[0]
											? <img src={song.album.images[0].url} alt="Thumbnail" />
											: <img src={`https://api.adorable.io/avatars/64/${song.title}.png`} alt="Thumbnail" />
										}
										<div onClick={() => this.onClick(song.spotify_id, 'song')} >
											<h3>{song.title}</h3>
											<p>{song.artist_name}</p>
										</div>
										<span className="options">
											<label>
												<i className="fas fa-plus" />
												<input type="checkbox" name="options" value="toggle" />
												<div className="option-list card">
													<p>Add song to playlist</p>
													{this.state.playlists.map((playlist, i) => (
														<p key={playlist._id} onClick={() => this.addSong(playlist._id, song.spotify_id)}>{playlist.title}</p>
													))
													}
												</div>
											</label>

										</span>
									</div>
								</span>
							))}
						</div>
						: <section className="light"><p>No songs found</p></section>}
				</section>

				<section className="card results round-bottom artists">
					{this.state.artists.length > 0
						? <div>
							{this.state.artists.map((artist, i) => (
								<span onClick={() => this.onClick(artist.spotify_id, 'artist')} key={artist.spotify_id}>
									<div className="playlist-item" >
										{artist.images[0]
											? <img src={artist.images[0].url} alt="Thumbnail" />
											: <img src={`https://api.adorable.io/avatars/64/${artist.title}.png`} alt="Thumbnail" />
										}
										<div>
											<h3>{artist.title}</h3>
										</div>
									</div>
								</span>
							))}
						</div>
						: <section className="light"><p>No artists found</p></section>}
				</section>

				<section className="light" style={{ paddingBottom: 16 + 'px' }}>
					<p>That's it, no more content! Use the search feature to find more.</p>
					<a id="scroll-top">Back to top <i className="fas fa-level-up-alt"></i></a>
				</section>

			</div>
		);
	}
}


export default Music;