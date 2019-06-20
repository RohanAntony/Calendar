import React, { Component } from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = parseInt(this.props.year, 10), month = parseInt(this.props.month, 10);
		this.state = {
			month: month,
			year: year,
			selected_date: {
				date: -1,
				month: -1,
				year: -1
			}
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

	selected = (date, month, year) => {
		let selected_date = {
			date: date,
			month: month,
			year: year
		}
		this.setState({
			selected_date: {
				...selected_date
			}
		})
	}

	render() {
		return (
			<table className="calendar">
				<Heading month={this.state.month}
								year={this.state.year}
								changeMonth={this.changeMonth}
								changeYear={this.changeYear}/>

				<Weeks month={this.state.month}
							year={this.state.year}
							selected_date={this.state.selected_date}
							selected={this.selected}/>
			</table>
		)
	}
}

export default Calendar;
