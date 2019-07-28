import React from 'react';

function notes(props){
	return (
		<div className="notes">
			<a href="#" class="add"><i class="fas fa-plus-circle"></i></a>
			<div className="note-list">
				{props.children}
			</div>
		</div>
	)
}

export default notes;
