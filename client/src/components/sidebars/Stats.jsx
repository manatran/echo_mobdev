import React, { Component } from 'react';
import store from '../../store';

class Stats extends Component {

	constructor(props) {
		super(props);

		this.state = {
			stats: undefined
		}
	}

	componentWillMount() {
		fetch(`/api/v1/user/stats/${store.getState().auth.user.user._id}`, { headers: { Authorization: store.getState().auth.user.token } })
			.then(response => response.json())
			.then(item => this.setState({ stats: item }));
	}

	render() {

		if (this.state.stats) {

			return (
				<div className="stats">
					<span className="posts">
						<em>{this.state.stats.posts}</em> Posts</span>
					<span className="comments">
						<em>{this.state.stats.comments}</em> Comments</span>
				</div>
			);
		}
		else {
			return null;
		}
	}
}

export default Stats;