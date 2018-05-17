import React, { Component } from 'react';
import store from '../../store';

/* Comoponents */
import Settings from '../../components/settings/Settings';

class SettingsPage extends Component {
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
				<Settings history={this.props.history} />
			</main>
		)
	}
}

export default SettingsPage;