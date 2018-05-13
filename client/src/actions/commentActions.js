import { FETCH_COMMENTS } from '../constants';

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