import { FETCH_COMMENTS } from '../constants';

const initialState = {
	comments: [],
	newCommentCreated: false,
	newComment: undefined,
	error: undefined,

}

function commentReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return {
				...state,
				comments: action.payload
			};
		default:
			return state;
	}
}

export default commentReducer;