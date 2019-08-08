import React from 'react';
import Note from './note';

function notes(props){

	let date = props.selectedDateObject.date + "/" + (props.selectedDateObject.month + 1) + "/" + props.selectedDateObject.year

	let noteChangeHandler = (evt, index) => {
		let content = evt.target.value;
		console.log(content, index)
		props.noteChangeHandler(content, index)
	}

	let notes = props.notes.map(
		(note, index) => <Note
												index={index}
												displayText={note.displayText}
												editText={note.editText}
												edit={note.edit}
												noteChangeHandler={noteChangeHandler}
												saveChangeHandler={props.saveChangeHandler}
												cancelChangeHandler={props.cancelChangeHandler}
												deleteNoteHandler={props.deleteNoteHandler}
												changeToEditHandler={props.changeToEditHandler}/>
	)

	return (
		<div className="notes">
			<div className="heading">
				<a href="#" className="button add" onClick={evt => props.addNewNoteHandler()}>
					<i className="fas fa-plus-circle"></i> Add note
				</a>
				<span className="date-display">{date}</span>
			</div>
			<div className="note-list">
				{notes}
			</div>
		</div>
	)
}

export default notes;
