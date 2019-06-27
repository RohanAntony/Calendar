import axios from 'axios';
import config from '../config.json';

function filterHolidayList(data){
	let newData = []

	for(let i = 0, j = 0; i < data.length; i++, j++){
		let month = data[i].date.datetime.month - 1,
				day = data[i].date.datetime.day
		if(!newData[month])
			newData[month] = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]
		newData[month][day] = data[i]
	}

	return newData;
}

function fetchHolidayList(year, cb){
	let url = "https://calendarific.com/api/v2/holidays?api_key="+config.api_key+"&country=IN&year=" + year;
	axios.get(url).then(function(response){
		if(response.status === 200)
			cb(filterHolidayList(response.data.response.holidays))
	}).catch(function(error){
			console.log(error)
	})
}

export default fetchHolidayList;
