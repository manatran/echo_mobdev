import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner';
import utils from '../../utilities/functions';

class MessageDetail extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chat: undefined,
			messages: [],
			message: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		const body = {
			author: store.getState().auth.user.user._id,
			content: this.state.message,
			conversation: this.props.chatId
		}
		if (this.state.message) {
			fetch(`/api/v1/messages/`,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						Authorization: store.getState().auth.user.token
					},
					body: JSON.stringify(body)
				})
				.then(response => response.json())
				.then((message) => {
					this.componentWillMount();
					this.setState(prevState => ({
						messages: [...prevState.messages, message]
					}))
					document.querySelector('.msg-form input[type=text]').value = '';
				})
		}

	}


	componentWillMount() {
		fetch(`/api/v1/chats/${this.props.chatId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then((chat) => {
				this.setState({ chat: chat })
			})

		fetch(`/api/v1/messages/${this.props.chatId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then((messages) => {
				this.setState({ messages: messages })
			})
	}

	componentDidUpdate() {
		this.scrollDown()
	}

	scrollDown() {
		let el = document.querySelector('.msg-body')
		if (el) {
			el.scrollTo(0, el.scrollHeight - el.clientHeight);
		}
	}

	getCorrespondent(user) {
		return user._id !== store.getState().auth.user.user._id
	}

	render() {
		if (this.state.chat) {
			return (
				<div>
					<section className="card msg-header round-top">
						<img src={this.state.chat.members.filter(this.getCorrespondent)[0].picture} alt="Thumbnail" />
						<h2>{this.state.chat.members.filter(this.getCorrespondent)[0].username}</h2>
					</section>
					<section className="card msg-body no-radius">
						<div className="msg-container">

							{this.state.messages.length > 0
								? this.state.messages.map((message, i) => (
									message.author._id === store.getState().auth.user.user._id || message.author === store.getState().auth.user.user._id
										? <div className="sent-msg" key={message._id}>
											<p>{message.content}</p>
										</div>

										: <div className="received-msg" key={message._id}>
											<p>{message.content}</p>
											<span className="meta"><span className="author">{message.author.username}</span>{utils.getTimeDifference(message.created_at)}</span>
										</div>
								))
								: <section className="light">No messages found.</section>
							}

						</div>
					</section>
					<section className="card msg-footer round-bottom">
						<form className="msg-form" onSubmit={this.onSubmit} autoComplete="off">
							<input name="message" onChange={this.onChange} type="text" placeholder="Type your text here..." />
							<label className="fas fa-paper-plane msg-send">
								<input type="submit" />
							</label>
						</form>
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

export default MessageDetail;