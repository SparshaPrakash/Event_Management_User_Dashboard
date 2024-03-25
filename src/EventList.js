import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // You might need to install this library

function EventList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Events data should come from API or other source
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [filterOption, setFilterOption] = useState(''); // State to store selected filter option
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [filteredEvents, setFilteredEvents] = useState([]); // State to store filtered events

  useEffect(() => {
    // Filter events based on search term whenever it changes
    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.startDate.toDateString().includes(searchTerm.toLowerCase()) ||
      event.endDate.toDateString().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleDateChange = date => {
    setSelectedDate(date);
    // Fetch events for the selected date
    // Example: fetchEvents(date)
  };

  const handleFilterChange = option => {
    setFilterOption(option);
    setShowCalendar(option === 'custom'); // Show calendar only when 'custom' option is selected
    if (option === 'clear') {
      setFilterOption('');
      // Clear the filtered events
      setFilteredEvents([]);
    } else if (option !== 'custom') {
      setEvents(getEventsForFilter(option));
    }
  };

  const handleCustomSubmit = () => {
    // Here, you can add logic to filter events based on the custom date range and display them
    // For now, we'll just simulate it by adding some sample events
    const customEvents = [
      { id: 1, name: "Alice's Baby Shower", startDate: startDate, endDate: endDate, location: "New York" },
      { id: 2, name: "Poker Night", startDate: startDate, endDate: endDate, location: "Los Angeles" }
      // Add more events as needed
    ];
    setEvents(customEvents);
  };

  // Function to filter events based on the selected filter option
  const getEventsForFilter = (option) => {
    switch (option) {
      case 'ongoing':
        return [
          { id: 1, name: "John's Birthday Party", startDate: new Date('2024-03-15'), endDate: new Date('2024-03-15'), location: "Chicago" },
          { id: 2, name: "Parents' 50th Wedding Anniversary", startDate: new Date('2024-03-20'), endDate: new Date('2024-03-20'), location: "San Francisco" }
          // Add more events as needed
        ];
      case 'past':
        return [
          { id: 3, name: "Graduation Ceremony", startDate: new Date('2023-12-20'), endDate: new Date('2023-12-20'), location: "Boston" },
          { id: 4, name: "Company Conference", startDate: new Date('2023-11-15'), endDate: new Date('2023-11-17'), location: "Seattle" }
          // Add more events as needed
        ];
      case 'upcoming':
        return [
          { id: 5, name: "Product Launch", startDate: new Date('2024-04-10'), endDate: new Date('2024-04-10'), location: "Austin" },
          { id: 6, name: "Family Picnic", startDate: new Date('2024-04-20'), endDate: new Date('2024-04-20'), location: "Miami" }
          // Add more events as needed
        ];
      default:
        return [];
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="event-list">
      <div className="filters">
        <h2>Event Views</h2>
        <select onChange={(e) => handleFilterChange(e.target.value)} value={filterOption}>
          <option value="">Select Filter</option>
          <option value="ongoing">Ongoing Events</option>
          <option value="past">Past Events</option>
          <option value="upcoming">Upcoming Events</option>
          <option value="custom">Custom Date Range</option>
          <option value="clear">Clear Filter</option> {/* Added option to clear filter */}
        </select>
        {showCalendar && (
          <div className="calendar-container" style={{ marginTop: '20px' }}>
            <div className="calendars">
              <Calendar
                onChange={handleStartDateChange} // Set start date when changed
                value={startDate}
                className="calendar"
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
              />
              <Calendar
                onChange={handleEndDateChange} // Set end date when changed
                value={endDate}
                className="calendar"
                formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
                />
              </div>
              <div className="submit-container">
                <button onClick={handleCustomSubmit}>Submit</button>
              </div>
              {/* Add a gap */}
              <div style={{ marginTop: '10px' }}>
                {/* Display selected start and end dates */}
                Selected Dates: {startDate.toDateString()} - {endDate.toDateString()}
              </div>
            </div>
          )}
        </div>
        {showCalendar && <div style={{ marginBottom: '20px' }}></div>}
        <div className="events" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2>My Events</h2>
          <ul>
            {filteredEvents.map(event => (
              <li key={event.id}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                  <h3>{event.name}</h3>
                  <p>Status: {getEventStatus(event.startDate)}</p>
                </div>
                <p>Location: {event.location}</p>
                <p>Start Date: {event.startDate.toDateString()}</p>
                <p>End Date: {event.endDate.toDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      );
    }
  
    // Function to determine the status of an event based on its start date
    const getEventStatus = (startDate) => {
      const currentDate = new Date();
      if (startDate < currentDate) {
        return 'Past';
      } else if (startDate.toDateString() === currentDate.toDateString()) {
        return 'Ongoing';
      } else {
        return 'Upcoming';
      }
    };
  
    export default EventList;
