import { registerUser } from './requestServices';

class Authenticate{

	userToken = "";

	_fetchUserTokenFromLocalStorage = () => {
		return localStorage.getItem('token') || ''
	}

	_setUserTokenToLocalStorage = token => {
		localStorage.setItem('token', token)
	}

	_deleteTokenFromLocalStorage = () => {
		localStorage.removeItem('token')
	}

	isAuthenticated = () => {
		let userToken = this._fetchUserTokenFromLocalStorage();
		if(userToken)
			return true;
		else
			return false;
	}

	authenticate = (email, password, cb) => {
		this._setUserTokenToLocalStorage('TestToken');
		cb('Credentials Error: Please check your password again')
	}

	register = (email, password, password2, firstName, cb) => {
		registerUser(email, password, firstName, response => {
			cb('You have been successfully registered!')
			console.log(response)
		}, error => {
			cb('Error while registering user')
			console.log(error)
		})
	}

	logout = (cb) => {
		this._deleteTokenFromLocalStorage();
		cb()
	}

	getUserToken = () => {
		return this._fetchUserTokenFromLocalStorage();
	}

}

export default Authenticate;
