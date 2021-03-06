import React from 'react';
import Week from './week';

function month(props){

	let weeks = []

	let start_day = (new Date(props.year, props.month, 1)).getDay();
	let start_date = 1;
	let end_date = 7 - start_day;
	let last_date_of_the_month = (new Date(props.year, (props.month+1), 0)).getDate()
	let today_date = (new Date())
	let today = (today_date.getMonth() === props.month && today_date.getFullYear() === props.year ? today_date.getDate() : 0)

	for(;end_date < last_date_of_the_month; start_date = end_date + 1, start_day = 0, end_date = end_date + 7)
		weeks.push([start_day, start_date, end_date])
	weeks.push([0, end_date - 6, last_date_of_the_month])

	function selectedDateHandler(date){
		props.selectedDateHandler(date, props.month, props.year)
	}

	function getHolidayDates(dates){
		return dates.map(date => date.date)
	}

	return (
		<tbody>
			{
				weeks.map(
					(w, i) => (
							<Week key={i}
										start_day={w[0]}
										start_date={w[1]}
										end_date={w[2]}
										today={today}
										selectedDateHandler = {selectedDateHandler}
										selectedDateValue = {
											props.selectedDateObject.month === props.month && props.selectedDateObject.year === props.year ?
											props.selectedDateObject.date :
											0
										}
										holidayListArray = {getHolidayDates(props.holidayListArray)}/>
						)
				)
			}
		</tbody>

	)
}

export default month;
