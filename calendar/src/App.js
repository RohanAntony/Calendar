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

  render(){
    return (
      <div className="App">
        <div className="calendar-outer">
          <Calendar month="9" year="2019"/>
        </div>
        <HolidayDetails holiday_name={this.state.holiday_name}
                        holiday_description={this.state.holiday_description}/>
      </div>
    )
  }
}

export default App;
