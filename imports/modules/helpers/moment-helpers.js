import moment from 'moment';


//BASIC DATE FORMAT
// formats the ISOdate for soemthing like an event
export const formatDate = (date) => {
  	const thisMoment = moment.utc(date).format("dddd, MMMM D");
    return thisMoment;
};

//BASIC TIME FORMAT
// formats the ISOdate for soemthing like an event
export const formatTime = (date) => {
  	//const thisMoment = moment.utc(date).format("dddd, MMMM D");
  	const thisMoment = moment(date, "hh").format('hA')
    return thisMoment;
};



//CHAT TIME
//formats the time (e.g. 4:29pm) that will show under a chat message
export const formatChatTime = (date) => {
  	const thisMoment = moment.utc(date).format("h:mm");
    return thisMoment;
};

//HOW LONG AGO FROM NOW
//formats time ad X minutes ago
export const timeAgo = (date) => {

	 var now = new Date();
	 var nowWrapper = moment(now);                  
	 var pastDateWrapper = moment(date);
	 var displayDate = pastDateWrapper.from(nowWrapper);
    return displayDate;
};




// used for taking the date from the date picker and the time from the time picker and adding them into one date obejct
export const datePlusTime = (date, time) => {
	console.log(date);
	console.log(time);
	console.log(date.getDate());
	console.log(time.getTime());
	let newDate = moment(date.getDate() + ' ' + time.getTime(), "YYYY-MM-DD HH:mm");
	console.log(newDate);
}