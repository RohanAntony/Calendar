import React from 'react';

function login(props){

	function authenticateHandler(){
		let email = document.getElementById('username').value,
				password = document.getElementById('password').value;
		props.authenticateHandler(email, password, () => {
			document.getElementById('password').value = ''
			document.getElementById('username').value = ''
		})
	}

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
									evt => authenticateHandler()
								}>
								Login
				</button>
				<button href="#" onClick={props.toggleRegisterHandler}>Register</button>
			</div>
		</div>
	)
}

export default login;
