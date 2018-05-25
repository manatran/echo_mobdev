import { GET_ERRORS, SET_CURRENT_USER } from '../constants';
import axios from 'axios';
import utils from '../utilities/functions';

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
			localStorage.setItem('mobdev2_auth', JSON.stringify(res.data));
      utils.setAuthToken(res.data.token);
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export function loginFacebook(accessToken, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({access_token: accessToken}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/facebook', options);
			const responseJson = await response.json();
			console.log(responseJson)

      dispatch({ 
        type: SET_CURRENT_USER,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));

      // Set token to Auth header
      const token = responseJson.token;
      utils.setAuthToken(token);

    } catch(error) {
      dispatch({
        type: GET_ERRORS,
        payload: 'Invalid access token'
      });
    }
  };
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