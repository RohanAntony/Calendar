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
					<textarea value={props.editText} onChange={evt => props.noteChangeHandler(evt, props.index)}></textarea>
					<a href="#" className="button" onClick={evt => props.saveChangeHandler(props.index)}><i class="fas fa-check-circle"></i></a>
					<a href="#" className="button" onClick={evt => props.cancelChangeHandler(props.index)}><i class="fas fa-times-circle"></i></a>
				</div>
				<div className={displayClasses} onClick={evt => props.changeToEditHandler(props.index)}>
					{props.displayText}
				</div>
			</div>
			<a href="#" className="button" onClick={evt => props.deleteNoteHandler(props.index)}><i className="fas fa-minus-circle icon"></i></a>
		</div>
	)
}

export default note;
