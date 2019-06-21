import axios from 'axios';
import config from '../config.json';

function filterHolidayList(data){
	return data.map(d => {
		return {
			name: d.name,
			description: d.description,
			year: d.date.datetime.year,
			month: d.date.datetime.month - 1,
			date: d.date.datetime.day,
			type: d.type[0]
		}
	})
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
