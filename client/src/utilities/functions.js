import axios from 'axios';

const utils = {
	millisToMinutesAndSeconds: function (millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	},
	getTimeDifference: function (datetime) {
		datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

		datetime = new Date(datetime).getTime();
		var now = new Date().getTime()

		if (isNaN(datetime)) {
			return "";
		}

		var milisec_diff = "";
		if (datetime < now) {
			milisec_diff = now - datetime;
		} else {
			milisec_diff = datetime - now;
		}

		var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
		var date_diff = new Date(milisec_diff);
		if (days < 1) return `${date_diff.getHours()} hours ago`;
		if (days >= 1) return `${days} days ago`;
	},
	formatDate: function (datetime) {
		datetime = new Date(datetime)
		return `${datetime}`
	},
	isEmpty: function (value) {
		return value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0);
	},
	setAuthToken: function (token) {
		if (token) {
			// Apply to every request
			axios.defaults.headers.common['Authorization'] = token;
		} else {
			// Delete auth header
			delete axios.defaults.headers.common['Authorization'];
		}
	},
	intersperse: function (arr, sep) {
		if (arr.length === 0) {
			return [];
		}

		return arr.slice(1).reduce(function (xs, x, i) {
			return xs.concat([sep, x]);
		}, [arr[0]]);
	},
	sort_by: function (field, reverse, primer) {

		var key = primer ?
			function (x) { return primer(x[field]) } :
			function (x) { return x[field] };

		reverse = !reverse ? 1 : -1;

		return function (a, b) {
			// eslint-disable-next-line
			return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		}
	},
	contains: function (a, id) {
		var i = a.length;
		while (i--) {
			if (a[i]._id === id) {
				return true;
			}
		}
		return false;
	}
}

export default utils;