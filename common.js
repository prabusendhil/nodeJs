exports.getDate = () => {
	return new Date();
}

exports.currDate = () => {
	return Date.now();
}

exports.getTime = () => {
var date = new Date();
date.getHours(); 
date.getMinutes(); 
date.getSeconds();
	return date;
}
