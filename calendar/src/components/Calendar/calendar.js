import React from 'react';
import Heading from './Heading/heading';
import Month from './month';

function Calendar(props){

	return (
		<div className="calendar-outer">
			<table className="calendar">
				<Heading
					month={props.month}
					year={props.year}
					changeMonthHandler={props.changeMonthHandler}
					changeYearHandler={props.changeYearHandler}
					/>
				<Month
					month={props.month}
					year={props.year}
					selectedDateObject={props.selectedDateObject}
					selectedDateHandler={props.selectedDateHandler}
					holidayListArray={props.holidayListArray}/>
			</table>
		</div>
	)
}

export default Calendar;
