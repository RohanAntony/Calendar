import React, { Component } from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

import GetHolidayList from '../../services/getHolidayList';

class Calendar extends Component{

	constructor(props){
		super(props)
		let year = parseInt(this.props.year, 10),
				month = parseInt(this.props.month, 10);
		this.state = {
			month: month,
			year: year,
			selected_date: {
				date: -1,
				month: -1,
				year: -1
			},
			year_holiday_list_available: false
		}
		this.holiday_list = {}
		GetHolidayList(year, (data) => {
			this.holiday_list[year] = data
			console.log(this.holiday_list[year])
			this.setState({
				year_holiday_list_available: true
			})
		});
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
			let year = (prevState.year + val);
			if(!this.holiday_list[year])
				GetHolidayList(year, (data) => {
					this.holiday_list[year] = data
					console.log(this.holiday_list[year])
					this.setState({
						year_holiday_list_available: true
					})
				});
			return {
				year: year,
				year_holiday_list_available: false
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
		this.props.selectedDate(this.holiday_list[year][month][date])
	}

	holidayListForMonth = (month) => {
		let list = (
				this.holiday_list[this.state.year] ?
				this.holiday_list[this.state.year][this.state.month] :
				[]
		)
		return list
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
							selected={this.selected}
							holiday_list={this.holidayListForMonth(this.state.month)}/>
			</table>
		)
	}
}

export default Calendar;
