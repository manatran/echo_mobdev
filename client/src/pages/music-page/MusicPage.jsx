import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import Music from '../../components/music/Music';

class MusicPage extends Component {
  constructor(props) {
    super(props);
	}
	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
		
  }

  render() {
    return (
      <main>
        <Music />
      </main>
    )
  }
}

export default (MusicPage);