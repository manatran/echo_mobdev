import React, { Component } from 'react';
import store from '../../store';

class Header extends Component {

	render() {
		return (
			<nav>
				<div className="main-nav">
					<img src="/favicon.png" alt="Echo" className="nav-logo" />
					{store.getState().auth.isAuthenticated &&
						<form action="/posts/search" method="GET" className="search-form">
							<label className="search">
								<i className="fa fa-search"></i>
								<input type="text" name="term" placeholder="Search Echo" />
							</label>
						</form>
					}
				</div>

				<div className="tabs">
					{store.getState().auth.isAuthenticated &&
						<div>
							<a href="/" className="active">Discussion</a>
							<a href="/browse">Browse</a>
							<a href="/messages">Messages</a>µ
						</div>
					}
				</div>

			</nav>
		)
	}
}

export default Header;