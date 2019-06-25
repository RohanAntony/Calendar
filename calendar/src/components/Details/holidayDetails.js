import React from 'react';

function details(props){

	return (
		<div className="details">
			<h3>{props.holiday_name}</h3>
			<p>{props.holiday_description}</p>
		</div>
	)
}

export default details;
