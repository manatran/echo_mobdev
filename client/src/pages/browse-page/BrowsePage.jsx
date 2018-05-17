import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import Browse from '../../components/browse/Browse';

class BrowsePage extends Component {
	constructor(props) {
		super(props);
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