import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
	post: postReducer,
  comment: commentReducer
});