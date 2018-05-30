import { FETCH_POSTS, POST_CREATION_ERROR, POST_CREATED } from '../constants';
import store from '../store';

export const fetchPosts = () => dispatch => {
	fetch('/api/v1/posts', { headers: { Authorization: store.getState().auth.user.token } })
		.then(response => response.json())
		.then((posts) => {
			dispatch({
				type: FETCH_POSTS,
				payload: posts
			})
		})
		.catch(err => console.log(err));
}

export function createPost({ title, synopsis, body, category }, history) {
	return async (dispatch) => {
		try {
			const postData = new Blob([JSON.stringify({ title: title, synopsis: synopsis, body: body, _category: category }, null, 2)], { type: 'application/json' });
			const options = {
				method: 'POST',
				body: postData,
				mode: 'cors',
				cache: 'default',
				headers: {
					Authorization: store.getState().auth.user.token
				}
			};
			const response = await fetch('/api/v1/posts', options);
			const responseJson = await response.json();

			dispatch({
				type: POST_CREATED,
				payload: responseJson
			});

		} catch (error) {
			dispatch({
				type: POST_CREATION_ERROR,
				payload: {
					message: 'Invalid email or password',
					exception: error
				}
			});
		}
	};
}