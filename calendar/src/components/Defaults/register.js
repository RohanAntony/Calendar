import React from 'react';

function register(props){

	function registerUserHandler(){
		let message = '',
				email = document.getElementById('email').value,
				password = document.getElementById('password').value,
				password2 = document.getElementById('password2').value,
				firstName = document.getElementById('firstName').value;

		if(email == '' || password == '' || password2 == '' || firstName == '')
			message = "All fields are required!"
		else if(password.length < 8)
			message = "Passwords must be 8 characters long at least!"
		else if(password !== password2)
			message = "Passwords don't match!"

		if(message === '')
			props.registerHandler(email, password, password2, firstName, (status) => {
				document.getElementById('password').value = ''
				document.getElementById('password2').value = ''
				if(status == 'success'){
					document.getElementById('email').value = ''
					document.getElementById('firstName').value = ''
				}	
			})
		else
			props.setMessageHandler(message)
	}

	return(
		<div className="login">
			<div className="element">
				<h2>Register</h2>
			</div>
			<div className="element">
				<p className="message">{props.message}</p>
			</div>
			<div className="element">
				<label for="username">Email:</label>
				<input type="text" name="username" id="email" placeholder="Email"/>
			</div>
			<div className="element">
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" placeholder="Password"/>
			</div>
			<div className="element">
				<label for="password2">Confirm Password:</label>
				<input type="password" name="password2" id="password2" placeholder="Confirm Password"/>
			</div>
			<div className="element">
				<label for="first_name">First Name:</label>
				<input type="text" name="first_name" id="firstName" placeholder="First Name"/>
			</div>
			<div className="element buttons">
				<button href="#" onClick={evt => registerUserHandler()}>Register</button>
				<button href="#" onClick={props.toggleRegisterHandler}>Back to login</button>
			</div>
		</div>
	)
}

export default register;
