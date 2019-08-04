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
					<a href="#" className="button" onClick={evt => props.saveNoteHandler}><i class="fas fa-times-circle"></i></a>
					<a href="#" className="button" onClick={evt => props.cancelNoteHandler}><i class="fas fa-check-circle"></i></a>
				</div>
				<div className={displayClasses}>
					{props.displayText}
				</div>
			</div>
			<a href="#" className="button" onClick={evt => props.deleteNoteHandler}><i className="fas fa-minus-circle icon"></i></a>
		</div>
	)
}

export default note;
