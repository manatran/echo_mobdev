import React, { Component } from 'react';

class Header extends Component {

	render() {
		return (
			<nav>
				<div className="main-nav">
					<img src="/favicon.png" alt="Echo" className="nav-logo" />
					<form action="/posts/search" method="GET" className="search-form">
					<label className="search">
						<i className="fa fa-search"></i>
						<input type="text" name="term" placeholder="Search Echo" />
					</label>
					</form>
				</div>
				<div className="tabs">
					<a href="/" className="active">Discussion</a>
					<a href="/browse">Browse</a>
					<a href="/messages">Messages</a>
				</div>
			</nav>
		)
	}
}

export default Header;