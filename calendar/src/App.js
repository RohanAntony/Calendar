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
    this.state = {
      current: {
        month: 9,
        year: 2019
      },
      selected:{
        date: -1,
        month: -1,
        year: -1
      },
      holiday:{
        name: "",
        description: "",
        type: ""
      },
      holidayListForYearObject: null,
      notes:["and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,", "Test2", "Test3"]
    }
    this.list = new HolidayList();
    this.notes = new CalendarNotes();
    let year = this.state.current.year;
    let month = this.state.current.year;
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
      this.setState({
        notes: [...notes]
      })
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
          <Notes notes={this.state.notes}/>
        </div>
      </div>
    )
  }
}

export default App;
