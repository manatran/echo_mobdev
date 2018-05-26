import React, { Component } from 'react';
import store from '../../store';

class MessageDetail extends Component {
	constructor(props){
		super(props)

		this.state = {
			messages: []
		}
	}

	componentWillMount(){
		fetch(`/api/v1/messages/${this.props.chatId}`, {headers: {Authorization: store.getState().auth.user.token}})
			.then(response => response.json())
			.then((messages) => {
				this.setState({ messages: messages })
			})
			.catch(err => window.location = "/messages")
	}

	render() {
		return (
			<section className="card">
				detail
			</section>
		)
	}
}

export default MessageDetail;