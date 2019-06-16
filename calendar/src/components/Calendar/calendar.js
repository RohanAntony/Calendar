import React, { Component } from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = parseInt(this.props.year), month = parseInt(this.props.month);
		let first_date = new Date(year, month, 1)
		let last_date = new Date(year, (month+1), 0)
		console.log(year, month, first_date, last_date)
		this.state = {
			month: parseInt(month, 10),
			year: parseInt(year, 10),
			first_day: first_date.getDay(),
			first_date: 1,
			last_day: last_date.getDay(),
			last_date: last_date.getDate()
		}
	}

	render() {
		return (
			<table className="calendar">
				<Heading month={this.state.month} year={this.state.year}/>
				<Weeks {...this.state}/>
			</table>
		)
	}
}

export default Calendar;
