import React from 'react';
import Note from './note';

function notes(props){

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
												deleteNoteHandler={props.deleteNoteHandler}/>
	)

	return (
		<div className="notes">
			<a href="#" class="button add" onClick={evt => props.addNewNoteHandler()}><i class="fas fa-plus-circle"></i> Add note</a>
			<div className="note-list">
				{notes}
			</div>
		</div>
	)
}

export default notes;
