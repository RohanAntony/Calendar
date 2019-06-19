import React, { Component } from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = parseInt(this.props.year, 10), month = parseInt(this.props.month, 10);
		this.state = {
			month: month,
			year: year
		}
	}

	changeMonth = val => {
		this.setState( prevState => {
			return {
				month: (prevState.month + val) % 12
			}
		})
	}

	changeYear = val => {
		this.setState( prevState => {
			return {
				year: (prevState.year + val)
			}
		})
	}

	render() {
		return (
			<table className="calendar">
				<Heading month={this.state.month} year={this.state.year} changeMonth={this.changeMonth} changeYear={this.changeYear}/>
				<Weeks {...this.state}/>
			</table>
		)
	}
}

export default Calendar;
