import React, { Component } from 'react';
import store from '../../store';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class Music extends Component {

	constructor(props) {
		super(props);
		this.state = {
			songs: '',
			albums: '',
			artists: ''
		}
	}

	componentWillMount() {
		fetch(`/api/v1/songs`)
			.then(response => response.json())
			.then(item => this.setState({ songs: item }));

		fetch(`/api/v1/albums`)
			.then(response => response.json())
			.then(item => this.setState({ albums: item }));

		fetch(`/api/v1/artists`)
			.then(response => response.json())
			.then(item => this.setState({ artists: item }));
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

					if (tabs[i].innerHTML.toLowerCase() == 'artists') artists.classList.remove('hidden')
					if (tabs[i].innerHTML.toLowerCase() == 'albums') albums.classList.remove('hidden')
					if (tabs[i].innerHTML.toLowerCase() == 'songs') songs.classList.remove('hidden')
				})
			}
		}
	}

	onClick(id, type){
		let newPost = {
			content: id,
			type: type,
			author: store.getState().auth.user._id
		}
		fetch(`/api/v1/posts/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newPost)
		})
			.then(response => response.json())
			.then((post) => {
				this.props.history.push(`/post/${post._id}`)
			})
	}

	render() {
		return (
			<div>

				<section className="card round-top tabs subtabs">
					<div>
						<a className="active" href="#">Artists</a>
						<a href="#">Albums</a>
						<a href="#">Songs</a>
					</div>
				</section>

				<section className="card light no-radius">
					<p>Click the content to create a post.</p>
				</section>

				{this.state.albums.length > 0
					? <section className="card results round-bottom albums hidden">
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
					</section>
					: <section className="card light"><p>No albums found</p></section>}

				{this.state.songs.length > 0
					? <section className="card results round-bottom songs hidden">
						{this.state.songs.map((song, i) => (
							<span onClick={() => this.onClick(song.spotify_id, 'song')} key={song.spotify_id}>
								<div className="playlist-item" >
									{song.album && song.album.images[0]
										? <img src={song.album.images[0].url} alt="Thumbnail" />
										: <img src={`https://api.adorable.io/avatars/64/${song.title}.png`} alt="Thumbnail" />
									}
									<div>
										<h3>{song.title}</h3>
										<p>{song.artist_name}</p>
									</div>
								</div>
							</span>
						))}
					</section>
					: <section className="card light"><p>No songs found</p></section>}

				{this.state.artists.length > 0
					? <section className="card results round-bottom artists">
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
					</section>
					: <section className="card light"><p>No artists found</p></section>}

				<section className="light" style={{ paddingBottom: 16 + 'px' }}>
					<p>That's it, no more content! Use the search feature to find more.</p>
					<a href="#" id="scroll-top">Back to top <i className="fas fa-level-up-alt"></i></a>
				</section>

			</div>
		);
	}
}


export default Music;