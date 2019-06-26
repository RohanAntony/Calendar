import React, { Component } from 'react';

import Calendar from './components/Calendar/calendar';
import HolidayDetails from './components/Details/holidayDetails';

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      holiday_name: "",
      holiday_description: ""
    }
  }

  selectedDate = (date) => {
    let name = "",
        description = "";
    if(date){
      name = date.name
      description = date.description
    }
    this.setState({
      holiday_name: name,
      holiday_description: description
    })
  }

  render(){
    return (
      <div className="App">
        <div className="calendar-outer">
          <Calendar month="9" year="2019" selectedDate={this.selectedDate}/>
        </div>
        <HolidayDetails holiday_name={this.state.holiday_name}
                        holiday_description={this.state.holiday_description}/>
      </div>
    )
  }
}

export default App;
