import { getHolidayList } from './requestServices';

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

	getHolidayListForYear = (year, cb) => {
		//Use cached version if available or fetch from backend
		if(this.holidayListObject[year]){
			cb(this.holidayListObject[year])
			return;
		}
		//if empty, fetch based on backend API and return response
		getHolidayList(year, (response) => {
			if(response.status === 200){				
				this.holidayListObject[year] = this._filterHolidayList(response.data.holidays)
				cb(this.holidayListObject[year])
			}else {
				cb([])
			}
		}, (error) => {
			console.log(JSON.stringify(error))
			cb([]);
		})

	}

}
export default HolidayList;
