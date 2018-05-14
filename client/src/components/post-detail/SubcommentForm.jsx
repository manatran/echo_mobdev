import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSubcomment } from '../../actions/commentActions';

import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class SubcommentForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			content: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		const subcomment = {
			parent_id: this.props.parentId,
			content: this.state.content,
			author: '5aef46e5bddead379cb44ea4'
		}
		this.props.createSubcomment(subcomment)
		window.location.reload()
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className="subcomment-form">
				<textarea name="content" id="comment" placeholder="Type your comment" onChange={this.onChange} value={this.state.content}></textarea>
				<button type="submit" value="Submit"><i className="fas fa-comment-alt"></i></button>
			</form>
		)
	}
}

SubcommentForm.propTypes = {
	createSubcomment: PropTypes.func.isRequired
}

export default connect(null, { createSubcomment })(SubcommentForm);