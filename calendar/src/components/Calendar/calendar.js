import React, { Component } from 'react';
import DaysHeading from '../DaysHeading/daysHeading';
import Week from '../Week/week';

class Calendar extends Component{
	render() {
		return (
			<table className="calendar">
				<DaysHeading />
				<Week/>
			</table>
		)
	}
}

export default Calendar;
