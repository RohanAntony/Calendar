import React from 'react';

function date(props){
	return(
		<td className="date">
			{props.date > 0 ? props.date : ""}
		</td>
	)
}

export default date;
