import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner'

import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'echo-mobdev';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/echo-mobdev/upload';

class PlaylistEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: '',
			title: '',
			description: '',
			playlist: undefined
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.deletePlaylist = this.deletePlaylist.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		let body = {}
		if (this.state.title) body.title = this.state.title
		if (this.state.image) body.image = this.state.image
		if (this.state.description) body.description = this.state.description

		fetch(`/api/v1/playlists/edit/${this.state.playlist._id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then((playlist) => {
				window.location = `/playlist/${this.state.playlist._id}`
			})
	}

	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});

		this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				this.setState({
					image: response.body.secure_url
				});
			}
		});
	}

	deletePlaylist(){
		fetch(`/api/v1/playlists/${this.props.playlistId}`, { method: 'DELETE', headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(playlist => {
				this.props.history.push('/playlists')
			})
	}

	componentWillMount() {
		fetch(`/api/v1/playlists/detail/${this.props.playlistId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(playlist => {
				this.setState({ playlist: playlist })
				this.setState({ title: this.state.playlist.title })
				this.setState({ description: this.state.playlist.description })
				this.setState({ image: this.state.playlist.image })
			})
	}

	render() {
		if (this.state.playlist) {
			return (
				<div>
					<section className="card settings">
						<h2>Settings</h2>
						<form onSubmit={this.onSubmit}>

							<label>Title<br />
								<input type="text" name="title" onChange={this.onChange} value={this.state.title} />
							</label>

							<label>Description <br />
								<textarea name="description" onChange={this.onChange} value={this.state.description}></textarea>
							</label>

							<label>Image <br />
								<div>
									<div>
										<p>{this.state.uploadedFile && this.state.uploadedFile.name}</p>
										<img className="image-preview" src={this.state.image} alt={this.state.image} />
									</div>
								</div>
								<Dropzone
									className="image-upload"
									multiple={false}
									accept="image/*"
									onDrop={this.onImageDrop.bind(this)}>
									<p>Drop an image or click to select a file to upload.</p>
								</Dropzone>
							</label>

							<input type="submit" value="Save changes" />
						</form>
						<span onClick={this.deletePlaylist} className="delete">Delete playlist</span>
					</section>
				</div>
			)
		}
		else {
			return (
				<Spinner />
			)
		}

	}
}

export default PlaylistEdit;