import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleNightmode } from '../../actions/nightmodeActions';
import { setCurrentUser } from '../../actions/authActions';
import store from '../../store';

import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'echo-mobdev';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/echo-mobdev/upload';

class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bio: '',
			picture: '',
			banner: '',
			user: undefined
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.handleToggleNightmode = this.handleToggleNightmode.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		let body = {}
		if (this.state.bio) body.bio = this.state.bio
		if (this.state.picture) body.picture = this.state.picture
		if (this.state.banner) body.banner = this.state.banner

		fetch(`/api/v1/user/edit/${this.state.user._id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: store.getState().auth.user.token
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then((user) => {
				let newUser = store.getState().auth.user;
				newUser.user = user;
				localStorage.setItem('mobdev2_auth', JSON.stringify(newUser))
				store.dispatch(setCurrentUser({ user: newUser }))
				window.location = `/profile/${this.state.user._id}`
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
					picture: response.body.secure_url
				});
			}
		});
	}

	handleToggleNightmode(e) {
		e.preventDefault()
		this.props.nightmodeClick()
	}

	componentDidMount() {
		this.setState({ bio: store.getState().auth.user.user.bio })
		this.setState({ banner: store.getState().auth.user.user.banner })
		this.setState({ user: store.getState().auth.user.user })
	}

	render() {
		return (
			<div>
				<section className="card settings">
					<h2>Settings</h2>
					<form onSubmit={this.onSubmit}>
						<label>Bio <br />
							<textarea name="bio" onChange={this.onChange} value={this.state.bio}></textarea>
						</label>
						<label>Banner URL<br />
							<input type="text" name="banner" onChange={this.onChange} value={this.state.banner} />
						</label>

						<label>Profile picture <br />
							<div>
								{this.state.picture === ''
									? <div>
										<img className="image-preview" src={store.getState().auth.user.user.picture} alt="Old" />
									</div>
									: <div>
										<p>{this.state.uploadedFile.name}</p>
										<img className="image-preview" src={this.state.picture} alt="New" />
									</div>}
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
					<a className="nightmode" onClick={this.handleToggleNightmode}>
						<i className="fa fa-moon"></i>Toggle Night Mode</a>
				</section>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		nightmode: state.nightmode.nightmode
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		nightmodeClick: () => dispatch(toggleNightmode())
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);