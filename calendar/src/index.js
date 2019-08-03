import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let today = new Date(),
		day = today.getDate(),
		month = today.getMonth(),
		year = today.getFullYear()

ReactDOM.render(<App day={day} month={month} year={year}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
