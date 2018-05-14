import { TOGGLE_NIGHTMODE, ADD_NIGHTMODE, REMOVE_NIGHTMODE } from '../constants';

const body = document.querySelector('html');

export const toggleNightmode = () => dispatch => {
	body.classList.toggle('dark')
	let nightmode = JSON.parse(localStorage.getItem('nightmode'))
	localStorage.setItem('nightmode', JSON.stringify(!nightmode))
	return { type: TOGGLE_NIGHTMODE }
}
export const addNightmode = () => dispatch => {
	body.classList.add('dark')
	localStorage.setItem('nightmode', 'true')
	return { type: ADD_NIGHTMODE }
}
export const removeNightmode = () => dispatch => {
	body.classList.remove('dark')
	localStorage.setItem('nightmode', 'false')
	return { type: REMOVE_NIGHTMODE }
}