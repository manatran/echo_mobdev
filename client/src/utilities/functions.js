const utils = {
	millisToMinutesAndSeconds: function(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	},
	getTimeDifference: function(datetime) {
		var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";

		var datetime = new Date(datetime).getTime();
		var now = new Date().getTime();

		if (isNaN(datetime)) {
			return "";
		}

		if (datetime < now) {
			var milisec_diff = now - datetime;
		} else {
			var milisec_diff = datetime - now;
		}

		var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
		var date_diff = new Date(milisec_diff);
		if (days < 1) return `${date_diff.getHours()} hours ago`;
		if (days >= 1) return `${days} days ago`;
	},
	formatDate: function(datetime) {
		datetime = new Date(datetime)
		return `${datetime}`
	}
}

export default utils;