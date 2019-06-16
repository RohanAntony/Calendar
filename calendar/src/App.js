import React from 'react';
import './App.css';

import Calendar from './components/Calendar/calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar month="1" year="2019"/>
      </header>
    </div>
  );
}

export default App;
