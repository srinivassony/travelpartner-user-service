const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

function generateUUID() 
{
    return uuidv4().split('-').join('').toUpperCase();
}

const status = {
    SUCCESS: 1,
    FAIL: 0
}

const userType = {
    USER: "USER"
}

const uuid = () =>
{
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	  });
}

const formatDate = (date) =>
{
    const day = date.date();
    const suffix = (day) =>
    {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10)
        {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return moment(date).format(`D[${suffix(day)}] MMM, YYYY`);
};


module.exports = {
    generateUUID: generateUUID,
    Status: status,
    userType: userType,
    uuid: uuid,
    formatDate: formatDate
}