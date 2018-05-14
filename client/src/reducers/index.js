import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import nightmodeReducer from './nightmodeReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
	post: postReducer,
  comment: commentReducer,
  nightmode: nightmodeReducer
});