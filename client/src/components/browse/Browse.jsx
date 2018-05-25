import React, { Component } from 'react';
import store from '../../store';

class Browse extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			songs: [],
			albums: [],
			artists: []
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.history.push(`/browse/${this.state.term}`)
		window.location.reload()
	}

	componentDidMount() {
		if (this.props.term !== undefined) {
			fetch(`/api/v1/search/song/${this.props.term}`, {headers: {Authorization: store.getState().auth.user.token}})
				.then(response => response.json())
				.then(item => this.setState({ songs: item }));

			fetch(`/api/v1/search/album/${this.props.term}`, {headers: {Authorization: store.getState().auth.user.token}})
				.then(response => response.json())
				.then(item => this.setState({ albums: item }));

			fetch(`/api/v1/search/artist/${this.props.term}`, {headers: {Authorization: store.getState().auth.user.token}})
				.then(response => response.json())
				.then(item => this.setState({ artists: item }));
		}
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
	}

	render() {
		return (
			<div>
				<section className="card browse">

					<form onSubmit={this.onSubmit} className="search-form">
						<label className="search">
							<i className="fa fa-search"></i>
							<input type="text" name="term" placeholder="Search Echo" onChange={this.onChange} value={this.state.term} />
						</label>
					</form>

					{(this.props.term)
						? <section className="light">
							<p>Results for {this.props.term}</p>
							<p>Click the content to create a post</p>
						</section>
						: <p>Use the searchbar above.</p>
					}


				</section>

				{this.state.albums.length > 0
					? <section className="card results">
						<h2>Albums</h2>
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
					? <section className="card results">
						<h2>Songs</h2>
						{this.state.songs.map((song, i) => (
							<span onClick={() => this.onClick(song.spotify_id, 'song')} key={song.spotify_id}>
								<div className="playlist-item" >
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
					? <section className="card results">
						<h2>Artists</h2>
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
			</div>
		)
	}
}

export default Browse;