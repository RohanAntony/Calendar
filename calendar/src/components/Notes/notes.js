import React from 'react';
import Note from './note';

function notes(props){

	let notes = props.notes.map(note => <Note content={note}/>)

	return (
		<div className="notes">
			<a href="#" class="button add"><i class="fas fa-plus-circle"></i> Add note</a>
			<div className="note-list">
				{notes}
			</div>
		</div>
	)
}

export default notes;
