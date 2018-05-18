import React, { Component } from 'react';
import utils from '../../utilities/functions'

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
			fetch(`/api/v1/search/song/${this.props.term}`)
				.then(response => response.json())
				.then(item => this.setState({ songs: item }));

			fetch(`/api/v1/search/album/${this.props.term}`)
				.then(response => response.json())
				.then(item => this.setState({ albums: item }));

			fetch(`/api/v1/search/artist/${this.props.term}`)
				.then(response => response.json())
				.then(item => this.setState({ artists: item }));
		}

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
						? <p>Results for {this.props.term}</p>
						: <p>Use the searchbar above.</p>
					}
				</section>

				{this.state.albums.length > 0
					? <section className="card results">
						<h2>Albums</h2>
						{this.state.albums.map((album, i) => (
							<a href={`https://open.spotify.com/album/${album.spotify_id}`} target="_blank" key={album.spotify_id}>
								<div className="playlist-item" >
									<img src={album.images && album.images[0].url} alt="Thumbnail" />
									<div>
										<h3>{album.title}</h3>
										<p>{album.artist_name}</p>
									</div>
								</div>
							</a>

						))}
					</section>
					: <section className="card light"><p>No albums found</p></section>}

				{this.state.songs.length > 0
					? <section className="card results">
						<h2>Songs</h2>
						{this.state.songs.map((song, i) => (
							<a href={`https://open.spotify.com/track/${song.spotify_id}`} target="_blank" key={song.spotify_id}>
								<div className="playlist-item" >
									<div>
										<h3>{song.title}</h3>
										<p>{song.artist_name}</p>
									</div>
								</div>
							</a>

						))}
					</section>
					: <section className="card light"><p>No songs found</p></section>}


				{this.state.artists.length > 0
					? <section className="card results">
						<h2>Artists</h2>
						{this.state.artists.map((artist, i) => (
							<a href={`https://open.spotify.com/artist/${artist.spotify_id}`} target="_blank" key={artist.spotify_id}>
								<div className="playlist-item" >
									{artist.images[0]
										? <img src={artist.images[0].url} alt="Thumbnail" />
										: <img src={`https://api.adorable.io/avatars/64/${artist.title}.png`} alt="Thumbnail" />
									}
									<div>
										<h3>{artist.title}</h3>
									</div>
								</div>
							</a>

						))}
					</section>
					: <section className="card light"><p>No artists found</p></section>}
			</div>
		)
	}
}

export default Browse;