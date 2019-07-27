import React from 'react';

function notes(props){
	return (
		<div className="notes">
			<button><i class="fas fa-plus-square"></i></button>
			<div className="note-list">
				{props.children}
			</div>
		</div>
	)
}

export default notes;
