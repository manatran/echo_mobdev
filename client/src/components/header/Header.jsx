import React, { Component } from 'react';
import store from '../../store';

class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			term: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		window.location.replace(`/browse/${this.state.term}`)
	}

	render() {

		return (
			<nav>
				<div className="main-nav">
					<img src="/favicon.png" alt="Echo" className="nav-logo" />
					{store.getState().auth.isAuthenticated &&
						<form onSubmit={this.onSubmit} className="search-form">
							<label className="search">
								<i className="fa fa-search"></i>
								<input type="text" name="term" placeholder="Search Echo" onChange={this.onChange} value={this.props.term} />
							</label>
						</form>
					}
				</div>

				<div className="tabs">
					{store.getState().auth.isAuthenticated &&
						<div>
							<a href="/" className="active">Discussion</a>
							<a href="/browse/%20">Browse</a>
							<a href="/messages">Messages</a>
						</div>
					}
				</div>

			</nav>
		)
	}
}

export default Header;