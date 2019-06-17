import React from 'react';
import Week from './week';

function weeks(props){

	let weeks = []

	console.log(props)

	let start_day = props.first_day;
	let start_date = props.first_date;
	let end_date = 7 - start_day;

	// weeks.push([start_day, start_date, end_date])
	for(;end_date < props.last_date; start_date = end_date + 1, start_day = 0, end_date = end_date + 7)
		weeks.push([start_day, start_date, end_date])
	weeks.push([0, end_date - 6, props.last_date])

	console.log(weeks)

	return (
		<tbody>
			{
				weeks.map((w, i) => (<Week key={i} child_key={i} start_day={w[0]} start_date={w[1]} end_date={w[2]} today={props.today}/>))
			}
		</tbody>

	)
}

export default weeks;
