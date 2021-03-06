import { FETCH_COMMENTS, CREATE_COMMENT, CREATE_SUBCOMMENT } from '../constants';
import store from '../store';

export const fetchComments = (postId) => dispatch => {
	fetch(`/api/v1/comments/${postId}`, {headers: {Authorization: store.getState().auth.user.token}})
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
			'content-type': 'application/json',
			Authorization: store.getState().auth.user.token
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

export const createSubcomment = subcommentData => dispatch => {
	fetch(`/api/v1/subcomments/`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: store.getState().auth.user.token
		},
		body: JSON.stringify(subcommentData)
	})
		.then(response => response.json())
		.then((subcomment) => {
			dispatch({
				type: CREATE_SUBCOMMENT,
				payload: subcomment
			})
		});
}
