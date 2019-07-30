import React from 'react';

function notes(props){
	return (
		<div className="notes">
			<a href="#" class="button add"><i class="fas fa-plus-circle"></i> Add note</a>
			<div className="note-list">
				{props.children}
			</div>
		</div>
	)
}

export default notes;
