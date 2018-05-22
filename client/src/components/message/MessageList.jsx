import React, { Component } from 'react';
import store from '../../store';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chats: []
		}
	}

	componentWillMount() {
		fetch(`/api/v1/chats/`, {headers: {Authorization: store.getState().auth.user.token}})
			.then(response => response.json())
			.then((chats) => {
				this.setState({ chats: chats })
			})
	}

	render() {
		return (
			<div>
				{this.state.chats.length > 0
					? <section className="card">
						{this.state.chats.map((chat, i) => (
							chat.title
						))}
					</section>
					: <section className="light">No conversations found </section>}
			</div>
		)
	}
}

export default MessageList;