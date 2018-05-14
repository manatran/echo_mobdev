import { TOGGLE_NIGHTMODE, ADD_NIGHTMODE, REMOVE_NIGHTMODE } from '../constants';

const initialState = {
	nightmode: false
}

function nightmodeReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_NIGHTMODE:
			return {
				...state,
				nightmode: !state.nightmode
			};
		case ADD_NIGHTMODE:
			return {
				...state,
				nightmode: true
			};
		case REMOVE_NIGHTMODE:
			return {
				...state,
				nightmode: false
			};
		default:
			return state;
	}
}

export default nightmodeReducer;