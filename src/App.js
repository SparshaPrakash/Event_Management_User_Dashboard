import React from 'react';
import './App.css';
import EventList from './EventList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Eventique</h1>
        <h3>Event Planning Made Easy</h3>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Log Out</a></li>
          </ul>
        </nav>
        <div className="calendar-link-container">
          <a href="#" className="calendar-link">My Calendar</a>
        </div>
      </header>
      <main>
        <EventList />
      </main>
    </div>
  );
}

export default App;
