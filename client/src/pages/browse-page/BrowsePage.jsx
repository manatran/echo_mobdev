import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import Browse from '../../components/browse/Browse';

class BrowsePage extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
	}
	
	render() {
		return (
			<main>
				<Browse history={this.props.history} term={this.props.match.params.term} />
			</main>
		)
	}
}

export default BrowsePage;