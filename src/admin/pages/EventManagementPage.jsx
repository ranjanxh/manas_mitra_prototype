import React, { useState, useMemo } from 'react';
import { mockEvents, mockRSVPs } from './mockEventData'; // We'll move data to its own file
import EventCalendarView from '../components/events/EventCalendarView';
import EventListView from '../components/events/EventListView';
import EventAnalyticsDashboard from '../components/events/EventAnalyticsDashboard';
import EventCreateEditForm from '../components/events/EventCreateEditForm';

const EventManagementPage = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Your existing mock data and state management for events would live here
  const [events, setEvents] = useState(mockEvents);

  const handleViewChange = (view, event = null) => {
    setCurrentView(view);
    setSelectedEvent(event);
  };

  const handleSaveEvent = (eventData) => {
    if (eventData.id) {
      // Update existing event
      setEvents(events.map(e => e.id === eventData.id ? { ...e, ...eventData } : e));
    } else {
      // Create new event
      const newEvent = { ...eventData, id: Date.now(), rsvpCount: 0, status: 'upcoming' };
      setEvents([...events, newEvent]);
    }
    setCurrentView('calendar');
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    setCurrentView('calendar');
  };

  // Render the correct view based on state
  switch (currentView) {
    case 'list':
      return <EventListView events={events} onViewChange={handleViewChange} />;
    case 'create':
    case 'edit':
      return <EventCreateEditForm event={selectedEvent} onSave={handleSaveEvent} onCancel={() => handleViewChange('calendar')} />;
    case 'analytics':
      return <EventAnalyticsDashboard event={selectedEvent} rsvps={mockRSVPs} onViewChange={handleViewChange} onDelete={handleDeleteEvent} />;
    case 'calendar':
    default:
      return <EventCalendarView events={events} onViewChange={handleViewChange} />;
  }
};

export default EventManagementPage;