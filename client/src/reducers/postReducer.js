import { FETCH_POSTS, POST_CREATED, POST_CREATION_ERROR } from '../constants';

const initialState = {
	posts: [],
  newPostCreated: false,
  newPost: undefined,
  error: undefined
}

function postReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				posts: action.payload
			};
    case POST_CREATED:
      return Object.assign({}, state, {
        newPostCreated: true,
        newPost: action.payload
      });
    case POST_CREATION_ERROR:
      return Object.assign({}, state, {
        newPostCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default postReducer;