import axios from 'axios';
import config from '../config.json';

function _setToken(instance, token){
	instance.defaults.headers.common['Authorization'] = 'Token ' + token;
}

let _execute = (url, data, method, successCallback, errorCallback, token) => {
	if(method === "POST"){
		axios.post(url, data)
		.then(successCallback)
		.catch(errorCallback)
	}
	else if(method === "GET"){
		axios.get(url)
		.then(successCallback)
		.catch(errorCallback)
	}
}

function getHolidayList(year, successCallback, errorCallback){
	let url = config.baseURL + "api/notes/holidays/" + year + "/";
	_execute(url, {}, "GET", successCallback, errorCallback)
}

function registerUser(email, password, firstName, successCallback, errorCallback){
	let url = config.baseURL + "api/account/register/";
	let data = {
		"email": email,
		"password": password,
		"first_name": firstName
	}
	_execute(url, data, "POST", successCallback, errorCallback);
}

function loginUser(email, password, successCallback, errorCallback){
	let url = config.baseURL + "api/account/token/";
	let data = {
		"email": email,
		"password": password
	}
	_execute(url, data, "POST", successCallback, errorCallback)
}

export {
	getHolidayList,
	registerUser,
	loginUser
}