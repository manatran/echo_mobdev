import { GET_ERRORS, SET_CURRENT_USER } from '../constants';
import axios from 'axios';
import utils from '../utilities/functions';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/v1/signup', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post('/api/v1/auth/local', userData)
    .then(res => {
			localStorage.setItem('mobdev2_auth', JSON.stringify(res.data.user));
      utils.setAuthToken(res.data.token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const loginFacebook = (accessToken, history) => dispatch => {

	const userData = new Blob([JSON.stringify({access_token: accessToken}, null, 2)], {type : 'application/json'});
	
	axios.post('/api/v1/auth/facebook', userData)
    .then(res => {
			localStorage.setItem('mobdev2_auth', JSON.stringify(res.data.user));
      utils.setAuthToken(res.data.token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('mobdev2_auth');
	// Remove auth header for future requests
	utils.setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
}