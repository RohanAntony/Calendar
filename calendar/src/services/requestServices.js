import axios from 'axios';
import config from '../config.json';

function _setToken(token){
	instance.defaults.headers.common['Authorization'] = 'Token ' + token;
}

let _execute = (url, data, method, successCallback, errorCallback, finalBlock) => {
	let instance = axios.create({
		baseURL: url,
		data: data,
		method: method
	})

	instance = instance.then(successCallback)
	instance = instance.catch(errorCallback)

	if(typeof(finalBlock) === "function")
		instance = instance.finally(finalBlock)
}

function getHolidayList(successCallback, errorCallback){
	let url = config.baseURL + "api/notes/holidays/" + year + "/";
	_execute(url, null, "GET", successCallback, errorCallback)
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