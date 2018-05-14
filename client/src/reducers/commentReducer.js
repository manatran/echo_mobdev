import { FETCH_COMMENTS, CREATE_COMMENT } from '../constants';
import { stat } from 'fs';

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
		default:
			return state;
	}
}

export default commentReducer;