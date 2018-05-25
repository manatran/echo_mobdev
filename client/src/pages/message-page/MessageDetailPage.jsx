import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import MessageDetail from '../../components/message/MessageDetail';

class MessageDetailPagge extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
		
  }

  render() {
    return (
      <main>
        <MessageDetail />
      </main>
    )
  }
}

export default (MessageDetailPagge);