import React from 'react';

function login(props){
	return(
		<div className="login">
			<div className="element">
				<h2>Login</h2>
			</div>
			<div className="element">
				<label for="username">Email:</label>
				<input type="text" name="username" placeholder="Email"/>
			</div>
			<div className="element">
				<label for="password">Password:</label>
				<input type="password" name="password" placeholder="Password"/>
			</div>
			<div className="element buttons">
				<button href="#">Login</button>
				<button href="#">Register</button>
			</div>
		</div>
	)
}

export default login;
