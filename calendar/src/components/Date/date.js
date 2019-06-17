import React from 'react';

function date(props){

	let className = "date"

	if(props.today)
		className += " current-date"

	return(
		<td className={className}>
			{props.date > 0 ? props.date : ""}
		</td>
	)
}

export default date;
