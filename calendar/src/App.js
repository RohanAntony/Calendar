import React, { Component } from 'react';

import Calendar from './components/Calendar/calendar';
import HolidayDetails from './components/Details/holidayDetails';

import Notes from './components/Notes/notes';
import Note from './components/Notes/note';

import HolidayList from './services/holidayList';
import CalendarNotes from './services/calendarNotes';

class App extends Component{

  constructor(props){
    super(props)
    let year = parseInt(props.year, 10);
    let month = parseInt(props.month, 10);
    let date = parseInt(props.date, 10) + 5;
    this.state = {
      current: {
        month: month,
        year: year
      },
      selected:{
        date: date,
        month: month,
        year: year
      },
      holiday:{
        name: "",
        description: "",
        type: ""
      },
      holidayListForYearObject: null,
      notes:[]
    }
    this.list = new HolidayList();
    this.notes = new CalendarNotes();
    this.list.getHolidayListForYear(year, data => {
      this.setState({
        holidayListForYearObject: data
      })
    })
  }

  changeMonthHandler = val => {
    this.setState( prevState => {
      let year = prevState.current.year;
      let month = (prevState.current.month + val) % 12;
      return {
        current:{
          year: year,
          month: month
        }
      }
    })
  }

  changeYearHandler = val => {
		this.setState( prevState => {
			let year = (prevState.current.year + val);
      let month = (prevState.current.month);
      this.list.getHolidayListForYear(year, data => {
        this.setState({
          holidayListForYearObject: data
        })
      })
			return {
				current:{
          month: month,
          year: year
        },
				holidayListForYearObject: null
			}
		})
	}

  holidayListForMonth = (month) => {
		return (
      this.state.holidayListForYearObject ?
      this.state.holidayListForYearObject[month] :
      []
    )
	}

  selectedDateHandler = (date, month, year) => {
    let selected = {
      date: date,
      month: month,
      year: year
    }
    let holidayDetailsOfSelectedDate = this.state.holidayListForYearObject[month][date];
    let holiday = {
      name: '', description: '', type: ''
    }
    if(holidayDetailsOfSelectedDate)
      holiday = {
        name: holidayDetailsOfSelectedDate["name"],
        description: holidayDetailsOfSelectedDate["description"],
        type: holidayDetailsOfSelectedDate["type"]
      }
    this.setState({
      selected: { ...selected },
      holiday: { ...holiday }
    })
    this.notes.getNotesForDate(date, month, year, notes => {
      let notesObjArray = notes.map(note => {
        return {
          editText: note,
          displayText: note,
          edit: false
        }
      })
      this.setState({
        notes: [...notesObjArray]
      })
    })
  }

  addNewNoteHandler = () => {
    this.setState(prevState => {
      return {
        notes: [{editText:'', displayText: '', edit: true}, ...prevState.notes]
      }
    })
  }

  render(){
    return (
      <div className="App">
        <div className="calendar-component">
          <Calendar
            month={this.state.current.month}
            year={this.state.current.year}
            selectedDateHandler={this.selectedDateHandler}
            changeMonthHandler={this.changeMonthHandler}
            changeYearHandler={this.changeYearHandler}
            selectedDateObject={this.state.selected}
            holidayListArray={this.holidayListForMonth(this.state.current.month)}
            />
          <HolidayDetails
            name={this.state.holiday["name"]}
            description={this.state.holiday["description"]}
            type={this.state.holiday["type"]}
            />
        </div>
        <div className="notes-component">
          <Notes
            notes={this.state.notes}
            addNewNoteHandler={this.addNewNoteHandler}/>
        </div>
      </div>
    )
  }
}

export default App;
