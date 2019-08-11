import React, { Component } from 'react';

import Calendar from './components/Calendar/calendar';
import HolidayDetails from './components/Details/holidayDetails';
import Notes from './components/Notes/notes';
import Note from './components/Notes/note';

import Login from './components/Defaults/login';
import Register from './components/Defaults/register';
import Navbar from './components/Defaults/navbar';

import CalendarNotes from './services/calendarNotes';
import HolidayList from './services/holidayList';
import Authenticate from './services/authenticate';


class App extends Component{

  constructor(props){
    super(props)
    let year = parseInt(props.year, 10);
    let month = parseInt(props.month, 10);
    let date = parseInt(props.date, 10);
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
      notes:[],
      authenticate: new Authenticate(),
      displayRegister: false
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

  holidayListForDate = (month, date) => {
    return (
      this.state.holidayListForYearObject ?
        (
          this.state.holidayListForYearObject[month] ?
          this.state.holidayListForYearObject[month][date] :
          null
        ) :
      null
    )
  }

  selectedDateHandler = (date, month, year) => {
    let selected = {
      date: date,
      month: month,
      year: year
    }
    let holidayDetailsOfSelectedDate = this.holidayListForDate(month, date);
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
        notes: [...prevState.notes, {editText:'', displayText: '', edit: true}]
      }
    })
  }

  noteChangeHandler = (content, index) => {
    this.setState(prevState => {
      let notes = prevState.notes;
      notes[index]['editText'] = content;
      return{
          notes: [...notes]
      }
    })
  }

  saveChangeHandler = index => {
    this.setState(prevState => {
      let notes = prevState.notes
      notes[index]['displayText'] = notes[index]['editText']
      notes[index]['edit'] = false
      this.notes.propagateNoteChanges(prevState.selected.date,
                                      prevState.selected.month,
                                      prevState.selected.year,
                                      index,
                                      notes[index]['editText'])
      return {
        notes: [...notes]
      }
    })
  }

  cancelChangeHandler = index => {
    this.setState(prevState => {
      let notes = prevState.notes
      notes[index]['editText'] = notes[index]['displayText']
      notes[index]['edit'] = false
      this.notes.propagateNoteChanges(prevState.selected.date,
                                      prevState.selected.month,
                                      prevState.selected.year,
                                      index,
                                      notes[index]['editText'])
      return {
        notes: [...notes]
      }
    })
  }

  deleteNoteHandler = index => {
    this.setState(prevState => {
      let notes = prevState.notes
      notes.splice(index, 1)
      this.notes.propagateNoteDelete(prevState.selected.date,
                                      prevState.selected.month,
                                      prevState.selected.year,
                                      index)
      return {
        notes: [...notes]
      }
    })
  }

  changeToEditHandler = index => {
    this.setState(prevState => {
      let notes = prevState.notes
      notes[index]['editText'] = notes[index]['displayText']
      notes[index]['edit'] = true
      return {
        notes: [...notes]
      }
    })
  }

  render(){

    let authenticated = this.state.authenticate.isAuthenticated();

    return (
      <div className="App">
        <Navbar authenticated={authenticated}/>
        <div className="main">
          {
            authenticated ?
            (
              <div className="section">
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
                    selectedDateObject={this.state.selected}
                    notes={this.state.notes}
                    addNewNoteHandler={this.addNewNoteHandler}
                    noteChangeHandler={this.noteChangeHandler}
                    saveChangeHandler={this.saveChangeHandler}
                    cancelChangeHandler={this.cancelChangeHandler}
                    deleteNoteHandler={this.deleteNoteHandler}
                    changeToEditHandler={this.changeToEditHandler}/>
                </div>
              </div>
            ) :
            (
              <div className="section">
                {
                  this.state.displayRegister ?
                  <Register
                    /> :
                  <Login
                    />
                }
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;
