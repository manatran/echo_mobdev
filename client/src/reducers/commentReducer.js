import { FETCH_COMMENTS, CREATE_COMMENT, CREATE_SUBCOMMENT } from '../constants';

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
		case CREATE_COMMENT:
			return {
				...state,
				comments: [action.payload, ...state.comments] 
			}
		case CREATE_SUBCOMMENT:
			return {
				...state
			}
		default:
			return state;
	}
}

export default commentReducer;