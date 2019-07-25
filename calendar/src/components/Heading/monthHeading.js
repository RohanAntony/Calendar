import React from 'react';

function monthHeading(props){

	let month = "";
	let year = props.year;

	if(props.month >= 0 && props.month < 12){
		switch(props.month){
			case 0:	month="January"; break;
			case 1:	month="February"; break;
			case 2:	month="March"; break;
			case 3:	month="April"; break;
			case 4:	month="May"; break;
			case 5:	month="June"; break;
			case 6:	month="July"; break;
			case 7:	month="August"; break;
			case 8:	month="September"; break;
			case 9:	month="October"; break;
			case 10:	month="November"; break;
			case 11:	month="December"; break;
			default: month="Invalid";
		}
	}

	return (
		<tr>
			<th className="month-heading" colSpan="4">
				<div>
					<a href="#" link="" onClick={evt => props.changeMonthHandler(-1)}><i className="fas fa-chevron-left icon"></i></a>
					<span>{month}</span>
					<a href="#" link="" onClick={evt => props.changeMonthHandler(+1)}><i className="fas fa-chevron-right icon"></i></a>
				</div>
			</th>
			<th className="month-heading" colSpan="3">
				<div>
					<a href="#" link="" onClick={evt => props.changeYearHandler(-1)}><i className="fas fa-chevron-left icon"></i></a>
					<span>{year}</span>
					<a href="#" link="" onClick={evt => props.changeYearHandler(+1)}><i className="fas fa-chevron-right icon"></i></a>
				</div>
			</th>
		</tr>
	)
}

export default monthHeading;
