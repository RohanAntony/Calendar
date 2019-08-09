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

	authenticate = (username, password) => {
		//Perform an axios operation to authenticate with username and password and store the returned token in local storage
		this._setUserTokenLocalStorage('TempTokenGeneratedInsertHere');
	}

	logout = () => {
		this._deleteTokenFromLocalStorage();
	}

	getUserToken = () => {
		return this._fetchUserTokenFromLocalStorage();
	}

}

export default Authenticate;
