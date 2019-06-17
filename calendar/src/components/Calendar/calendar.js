import React, { Component } from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = parseInt(this.props.year, 10), month = parseInt(this.props.month, 10);
		let first_date = new Date(year, month, 1)
		let last_date = new Date(year, (month+1), 0)
		let today = new Date();
		console.log(year, month, today.getMonth(), today.getFullYear())
		this.state = {
			month: month,
			year: year,
			first_day: first_date.getDay(),
			first_date: 1,
			last_day: last_date.getDay(),
			last_date: last_date.getDate(),
			today: (
				today.getMonth() === month && today.getFullYear() === year ? today.getDate() : 0
			)
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
