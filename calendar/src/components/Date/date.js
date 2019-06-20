import React from 'react';

function date(props){

	let className = "date"

	if(props.today)
		className += " current-date"

	if(props.selected_date)
		className += " selected"

	function selected(props){
		if(props.date > 0)
			props.selected(props.date)
		else
			return;
	}

	return(
		<td className={className} onClick={ (evt) => selected(props)}>
			{props.date > 0 ? props.date : ""}
		</td>
	)
}

export default date;
