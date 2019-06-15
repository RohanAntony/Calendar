import React from 'react';
import DaysHeading from './daysHeading.js';
import MonthHeading from './monthHeading.js';


function heading(props){
	return(
		<thead>
			<MonthHeading month={props.month} year={props.year}/>
			<DaysHeading />
		</thead>
	)
}

export default heading;
