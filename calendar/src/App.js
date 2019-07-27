import React, { Component } from 'react';

import Calendar from './components/Calendar/calendar';
import HolidayDetails from './components/Details/holidayDetails';

import Notes from './components/Notes/notes';
import Note from './components/Notes/note';

import HolidayList from './services/getHolidayList';

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
      holidayListForYearObject: null
    }
    this.list = new HolidayList();
    let year = this.state.current.year;
    this.list.getHolidayListForYear(year, data => {
      console.log(data)
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
          <Notes>
            <Note content="Note1"/>
            <Note content="Note2"/>
            <Note content="Note3"/>
          </Notes>
        </div>
      </div>
    )
  }
}

export default App;
