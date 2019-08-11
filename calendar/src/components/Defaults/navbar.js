import React from 'react';

function navbar(props){
	return (
		<nav className="nav">
			<h1 className="brand">Caliary</h1>
			{
				props.authenticated ?
				<a href="#" className="logout">Logout</a> :
				null
			}
		</nav>
	)
}

export default navbar;
