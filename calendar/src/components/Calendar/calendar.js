import React, { Component } from 'react';
import DaysHeading from '../Heading/daysHeading';
import MonthHeading from '../Heading/monthHeading';
import Week from '../Week/week';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = this.props.year, month = this.props.month;
		// let first_date = new Date(year, month, 1)
		// let last_date = new Date(year, month + 1, 0)
		this.state = {
			month: parseInt(month, 10),
			year: parseInt(year, 10)
		}
	}

	render() {
		return (
			<table className="calendar">
				<thead>
					<MonthHeading month={this.state.month} year={this.state.year}/>
					<DaysHeading />
				</thead>
				<tbody>
					<Week/>
				</tbody>
			</table>
		)
	}
}

export default Calendar;
