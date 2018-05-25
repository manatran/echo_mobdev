import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import Music from '../../components/music/Music';

class MusicPage extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
		
  }

  render() {
    return (
      <main>
        <Music history={this.props.history} />
      </main>
    )
  }
}

export default (MusicPage);