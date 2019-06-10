import React, { Component } from 'react';
import Date from '../Date/date';

class Calendar extends Component{
	render() {
		return (
			<div>
				<h1>Calendar</h1>
				<Date datetime="15"/>
			</div>
		)
	}
}

export default Calendar;
