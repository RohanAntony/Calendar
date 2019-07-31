import axios from 'axios';
import config from '../config.json';

class HolidayList {

	holidayListObject = {}

	_filterHolidayList = (data) => {
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

	_fetchHolidayList = (year, cb) => {
		let url = "https://calendarific.com/api/v2/holidays?api_key="+config.api_key+"&country=IN&year=" + year;
		axios.get(url).then((response) => {
			if(response.status === 200)
				this.holidayListObject[year] = this._filterHolidayList(response.data.response.holidays)
				cb();
		}).catch(function(error){
				console.log(error)
		})
	}

	getHolidayListForYear = (year, cb) => {
		if(this.holidayListObject[year])
			cb(this.holidayListObject[year])
		this._fetchHolidayList(year, () => {
			cb(this.holidayListObject[year])
		})
	}

}
export default HolidayList;
