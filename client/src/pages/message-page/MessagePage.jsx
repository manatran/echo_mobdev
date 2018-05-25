import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import MessageList from '../../components/message/MessageList';

class MessagePage extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
		
  }

  render() {
    return (
      <main>
        <MessageList />
      </main>
    )
  }
}

export default (MessagePage);