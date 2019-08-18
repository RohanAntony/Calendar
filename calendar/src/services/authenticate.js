import axios from 'axios';
import axiosInstance from './requestServices';
import config from '../config.json';

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
		axiosInstance.post('/api/account/register/',{
			email: email,
			password: password,
			first_name: firstName
		}).then(response => {
			cb('You have been successfully registered!')
			console.log(response)
		}).catch(error => {
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
