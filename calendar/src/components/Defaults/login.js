import React from 'react';

function login(props){
	return(
		<div className="login">
			<div className="element">
				<h2>Login</h2>
			</div>
			<div className="element">
				<p className="message">{props.message}</p>
			</div>
			<div className="element">
				<label for="username">Email:</label>
				<input type="text" name="username" id="username" placeholder="Email"/>
			</div>
			<div className="element">
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" placeholder="Password"/>
			</div>
			<div className="element buttons">
				<button href="#"
								onClick={
									evt => props.authenticateHandler(document.getElementById('username').value, document.getElementById('password').value)
								}>
								Login
				</button>
				<button href="#" onClick={props.toggleRegisterHandler}>Register</button>
			</div>
		</div>
	)
}

export default login;
