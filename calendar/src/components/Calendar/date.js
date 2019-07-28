import React from 'react';

function date(props){

	let className = "date"

	if(props.today)
		className += " current-date"

	if(props.isSelectedDate)
		className += " selected"

	if(props.holidayListArray[props.date])
		className += " holiday"

	if(props.date > 0)
		className += " valid-date"

	function selectedDateHandler(props){
		if(props.date > 0)
			props.selectedDateHandler(props.date)
		else
			return;
	}

	return(
		<td className={className} onClick={ (evt) => selectedDateHandler(props)}>
			{props.date > 0 ? props.date : ""}
		</td>
	)
}

export default date;
