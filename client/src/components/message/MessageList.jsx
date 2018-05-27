import React, { Component } from 'react';
import store from '../../store';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chats: [],
		}
	}

	componentWillMount() {
		fetch(`/api/v1/chats/user/${store.getState().auth.user.user._id}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then((chats) => {
				this.setState({ chats: chats })
			})
	}

	getCorrespondent(user) {
		return user._id !== store.getState().auth.user.user._id
	}

	render() {
		return (
			<div>
				{this.state.chats.length > 0
					? <section className="card conversation-list">
					<h2>Your conversations</h2>
						{this.state.chats.map((chat, i) => (
							<a href={`/messages/${chat._id}`} key={chat._id} >
								<section className="conversation">
									<img src={chat.members.filter(this.getCorrespondent)[0].picture} alt="Thumbnail" />
									<h2>{chat.members.filter(this.getCorrespondent)[0].username}</h2>
								</section>
							</a>
						))}
					</section>
					: <section className="light">No conversations found </section>}
			</div>
		)
	}
}

export default MessageList;