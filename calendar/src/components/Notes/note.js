import React from 'react';

function note(props){
	return(
		<div className="note">
			<div className="content">
				<div className="edit hidden">
					<input type="text" value={props.content}/><a href="#" className="button"><i class="fas fa-check-circle"></i></a>
				</div>
				<div className="display">
					{props.content}
				</div>
			</div>
			<a href="#" className="button"><i className="fas fa-minus-circle icon"></i></a>
		</div>
	)
}

export default note;
