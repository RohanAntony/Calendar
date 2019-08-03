class CalendarNotes{

	calendarNotesObject = {
		"2019": {
			"9": {
				"26": ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis tellus, bibendum commodo malesuada vitae, tincidunt in velit. Nulla facilisi. Duis et placerat leo. Vestibulum augue augue, vestibulum sit amet lectus eu, tincidunt placerat nisl. Sed magna libero, elementum at est ut, porttitor lobortis mi. Nam urna velit, fermentum vel varius fringilla, viverra quis eros. Cras egestas nec lorem eget dapibus. Maecenas turpis orci, ultricies a faucibus in, dictum gravida lorem. Etiam non tellus quam. Sed nisi eros, pellentesque quis justo quis, dictum facilisis libero. Mauris mattis ornare ligula sit amet posuere. Praesent aliquet semper neque id tempor. ", "Sed at ex finibus, egestas nulla a, pulvinar augue. Nam fermentum metus ac erat lacinia congue. Proin eu tempor purus. Morbi interdum, odio quis porta cursus, ex quam tempus ipsum, tempus tristique erat odio sed metus. Curabitur eget volutpat nibh. Nullam porttitor finibus mauris eget tempus. Praesent ut ultricies orci. Nullam condimentum quis justo ac tempor. Nunc accumsan est a risus pharetra, vel gravida magna ullamcorper. Sed eros dui, scelerisque in euismod sed, vulputate nec justo. Fusce sapien magna, dignissim lacinia lorem a, condimentum gravida sapien. Nunc hendrerit, elit sed sagittis scelerisque, mauris erat efficitur elit, id tincidunt erat velit vitae sapien. Quisque nisi leo, bibendum ac placerat vitae, lacinia et augue. "]
			}
		}
	}

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
