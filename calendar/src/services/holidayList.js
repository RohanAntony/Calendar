import axios from 'axios';
import config from '../config.json';

class HolidayList {

	holidayListObject = {}

	_filterHolidayList = (data) => {
		let newData = []
		for(let i = 0, j = 0; i < data.length; i++, j++){
			let month = data[i].month - 1,
					day = data[i].date
			if(!newData[month])
				newData[month] = []
			newData[month][day] = data[i]
		}
		return newData;
	}

	_fetchHolidayList = (year, cb) => {
		let url = config.base_url + "api/notes/holidays/" + year + "/";
		let that = this;
		axios.get(url).then((response) => {
			if(response.status === 200){				
				this.holidayListObject[year] = this._filterHolidayList(response.holidays)
				cb();
			}
		}).catch(function(error){
			console.log("Error while fetching data for holiday list for the year " + year)
			console.log(error)
			cb();
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
