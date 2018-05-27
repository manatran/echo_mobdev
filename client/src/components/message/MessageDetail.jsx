import React, { Component } from 'react';
import store from '../../store';
import Spinner from '../spinner/Spinner';
import utils from '../../utilities/functions';

class MessageDetail extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chat: undefined,
			messages: []
		}
	}

	componentWillMount() {
		fetch(`/api/v1/chats/${this.props.chatId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then((chat) => {
				this.setState({ chat: chat })
			})
			.catch(err => window.location = "/messages")
		fetch(`/api/v1/messages/${this.props.chatId}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then((messages) => {
				this.setState({ messages: messages })
			})
			.catch(err => window.location = "/messages")
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
							<div className="sent-msg">
								<p>First msg</p>
							</div>
							<div className="received-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
								<span className="meta"><span className="author">simodecl</span>8h ago</span>
							</div>
							<div className="sent-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
							</div>
							<div className="received-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
								<span className="meta"><span className="author">simodecl</span>8h ago</span>
							</div>
							<div className="sent-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
							</div>
							<div className="received-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
								<span className="meta"><span className="author">simodecl</span>8h ago</span>
							</div>
							<div className="received-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
								<span className="meta"><span className="author">simodecl</span>8h ago</span>
							</div>
							<div className="sent-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
							</div>
							<div className="received-msg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
								<span className="meta"><span className="author">simodecl</span>8h ago</span>
							</div>
						</div>
					</section>
					<section className="card msg-footer round-bottom">
						<form className="msg-form">
							<input type="text" placeholder="Type your text here..." />
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