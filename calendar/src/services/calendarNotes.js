class CalendarNotes{

	calendarNotesObject = {}

	_getNotesForDateOrCreate = (date, month, year) => {
		if(!this.calendarNotesObject[year])
			this.calendarNotesObject[year] = {}
		if(!this.calendarNotesObject[year][month])
			this.calendarNotesObject[year][month] = {}
		if(!this.calendarNotesObject[year][month][date])
			this.calendarNotesObject[year][month][date] = []
		return this.calendarNotesObject[year][month][date];
	}

	getNotesForDate = (date, month, year, cb) => {
		//Use axios and fetch notes from backend and submit
		if(!(this._getNotesForDateOrCreate(date, month, year)).length)
				console.log("Fetch data as there is no entry")
		cb(this._getNotesForDateOrCreate(date, month, year))
	}

}

export default CalendarNotes;
