import { FETCH_COMMENTS, CREATE_COMMENT } from '../constants';

export const fetchComments = (postId) => dispatch => {
	fetch(`/api/v1/comments/${postId}`)
		.then(response => response.json())
		.then((comments) => {
			dispatch({
				type: FETCH_COMMENTS,
				payload: comments
			})
		});
}

export const createComment = commentData => dispatch => {
	fetch(`/api/v1/comments/`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(commentData)
	})
		.then(response => response.json())
		.then((comment) => {
			dispatch({
				type: CREATE_COMMENT,
				payload: comment
			})
		});
}
