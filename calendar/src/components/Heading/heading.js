import React from 'react';
import DaysHeading from './daysHeading.js';
import MonthHeading from './monthHeading.js';


function heading(props){
	return(
		<thead>
			<MonthHeading month={props.month} year={props.year} changeMonth={props.changeMonth} changeYear={props.changeYear}/>
			<DaysHeading />
		</thead>
	)
}

export default heading;
