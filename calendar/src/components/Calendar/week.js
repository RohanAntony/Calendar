import React from 'react';
import Date from './date';

function week(props){

	//add error condition for checking if the number of days exceeds 7
	let date_difference = props.end_date - props.start_date + 1;
	if(date_difference > 7)
		date_difference = 7

	const days = [{date: -1},
								{date: -1},
								{date: -1},
								{date: -1},
								{date: -1},
								{date: -1},
								{date: -1}]

	let i = props.start_day;
	for(let j = parseInt(props.start_date); j <= props.end_date; j++, i++)
		days[i] = { date: j }

	function selectedDateHandler(date){
		props.selectedDateHandler(date)
	}

	return (
		<tr className="week">
			{
				days.map(
					(d, i) => (
						<Date key={i}
									date={d.date}
									today={ (d.date === props.today) ? true : false }
									selectedDateHandler = {selectedDateHandler}
									isSelectedDate = { props.selectedDateValue === d.date ? true : false}
									holidayListArray = {props.holidayListArray}
									/>
					)
				)
			}
		</tr>
	)
}

export default week;
