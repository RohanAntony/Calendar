import axios from 'axios';
import config from '../config.json';

const instance = axios.create({
	baseURL: config.base_url,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "text/plain"
	}
})

function setToken(token){
	instance.defaults.headers.common['Authorization'] = 'Token ' + token;
}

export default instance;
