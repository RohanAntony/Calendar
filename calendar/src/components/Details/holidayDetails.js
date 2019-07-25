import React from 'react';

function details(props){

	return (
		<div className="details">
			<h3>{props.name}</h3>
			<p>{props.type}</p>
			<p>{props.description}</p>
		</div>
	)
}

export default details;
