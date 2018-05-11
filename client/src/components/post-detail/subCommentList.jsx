import React, { Component } from 'react';
import utils from '../../utilities/functions';
import Spinner from '../spinner/Spinner';

class SubcommentList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			subcomments: []
		}
	}

	componentDidMount() {
		fetch(`/api/v1/subcomments/${this.props.commentId}`)
			.then(response => response.json())
			.then(item => this.setState({ subcomments: item }));
	}

	render() {
		if (this.state.subcomments) {
			return (
				<div className="subcomment-thread">
						{this.state.subcomments.map((subcomment, i) => (
								<div className="subcomment" key={subcomment._id}>
									<h2>
										{subcomment.author.username}
										<time className="timestamp" title={utils.formatDate(subcomment.created_at)} dateTime={utils.formatDate(subcomment.created_at)}>{utils.getTimeDifference(subcomment.created_at)}</time>
									</h2>
									<p>{subcomment.content}</p>
									<div className="actions">
										<span className="likes"><i className="fa fa-heart"></i>{subcomment.likes.length}</span>
										<span className="comments"><i className="fa fa-comments"></i>250</span>
										<span className="share"><i className="fa fa-share"></i>share</span>
									</div>
								</div>
							))
						}
				</div>
			)
		}else{
			return(
				<div>
					<Spinner />
				</div>
			)
		}
	}
}

export default SubcommentList;