import React from 'react';

function register(props){
	return(
		<div className="login">
			<div className="element">
				<h2>Register</h2>
			</div>
			<div className="element">
				<label for="username">Email:</label>
				<input type="text" name="username" placeholder="Email"/>
			</div>
			<div className="element">
				<label for="password">Password:</label>
				<input type="password" name="password" placeholder="Password"/>
			</div>
			<div className="element">
				<label for="password2">Confirm Password:</label>
				<input type="password" name="password2" placeholder="Confirm Password"/>
			</div>
			<div className="element">
				<label for="first_name">First Name:</label>
				<input type="text" name="first_name" placeholder="First Name"/>
			</div>
			<div className="element buttons">
				<button href="#">Register</button>
			</div>
		</div>
	)
}

export default register;
