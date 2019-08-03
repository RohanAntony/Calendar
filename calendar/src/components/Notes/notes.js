import React from 'react';
import Note from './note';

function notes(props){

	let notes = props.notes.map((note, index) => <Note key={note+(new Date()).toISOString()} content={note.displayText} edit={note.edit}/>)

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
