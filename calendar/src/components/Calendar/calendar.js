import React from 'react';
import Heading from '../Heading/heading';
import Weeks from '../Week/weeks';

function Calendar(props){

	let year = parseInt(props.year, 10),
			month = parseInt(props.month, 10);

	return (
		<table className="calendar">
			<Heading
				month={props.month}
				year={props.year}
				changeMonthHandler={props.changeMonthHandler}
				changeYearHandler={props.changeYearHandler}
				/>
			<Weeks
				month={props.month}
				year={props.year}
				selectedDateObject={props.selectedDateObject}
				selectedDateHandler={props.selectedDateHandler}
				holidayListArray={props.holidayListArray}/>
		</table>
	)
}

export default Calendar;
