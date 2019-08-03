import React from 'react';

function note(props){

	let editClasses = "edit"
	let displayClasses = "display"

	if(!props.edit)
		editClasses += " hidden"
	else
		displayClasses += " hidden"

	return(
		<div className="note">
			<div className="content">
				<div className={editClasses}>
					<textarea>{props.content}</textarea>
					<a href="#" className="button"><i class="fas fa-times-circle"></i></a>
					<a href="#" className="button"><i class="fas fa-check-circle"></i></a>
				</div>
				<div className={displayClasses}>
					{props.content}
				</div>
			</div>
			<a href="#" className="button"><i className="fas fa-minus-circle icon"></i></a>
		</div>
	)
}

export default note;
