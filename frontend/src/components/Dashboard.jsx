import { useEffect, useState } from 'react';
import { getStudentEvents } from '../services/eventService';
import '../style/Dashboard.css';

export default function Dashboard({ student }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    overdue: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!student || !student.id) {
          setLoading(false);
          return;
        }

        const response = await getStudentEvents(student.id);
        const eventsList = response.events || [];
        setEvents(eventsList);

        // Calculate statistics
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let upcoming = 0;
        let overdue = 0;
        let completed = 0;

        eventsList.forEach((event) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);

          if (event.status === 'completed') {
            completed++;
          } else if (eventDate < today) {
            overdue++;
          } else {
            upcoming++;
          }
        });

        setStats({
          total: eventsList.length,
          upcoming,
          overdue,
          completed,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [student]);

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events
      .filter((e) => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return e.status !== 'completed' && eventDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const getOverdueEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events
      .filter((e) => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return e.status !== 'completed' && eventDate < today;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>📊 Dashboard & Analytics</h1>
          <p>Track all your events, deadlines, and reminders in one place.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📌</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Events</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.upcoming}</div>
              <div className="stat-label">Upcoming</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-value">{stats.overdue}</div>
              <div className="stat-label">Overdue</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="loading-state">
            <p>Loading your events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🗂️</div>
            <h2>No events yet</h2>
            <p>Start by adding your first event or assignment in the Event Inbox.</p>
          </div>
        ) : (
          <div className="events-section">
            {/* Upcoming Events */}
            {getUpcomingEvents().length > 0 && (
              <div className="events-list">
                <h2 className="section-title">📅 Upcoming Events</h2>
                <div className="events-table">
                  {getUpcomingEvents().map((event) => (
                    <div key={event.id} className="event-row">
                      <div className="event-left">
                        <div className="event-title">{event.title}</div>
                        <div className="event-meta">
                          <span className="event-date">{formatDate(event.date)}</span>
                          <span className="event-time">⏰ {event.time}</span>
                        </div>
                        {event.description && (
                          <div className="event-description">{event.description}</div>
                        )}
                      </div>
                      <div className="event-status">
                        <span className="badge badge-upcoming">Upcoming</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overdue Events */}
            {getOverdueEvents().length > 0 && (
              <div className="events-list">
                <h2 className="section-title">⚠️ Overdue Events</h2>
                <div className="events-table">
                  {getOverdueEvents().map((event) => (
                    <div key={event.id} className="event-row overdue">
                      <div className="event-left">
                        <div className="event-title">{event.title}</div>
                        <div className="event-meta">
                          <span className="event-date">{formatDate(event.date)}</span>
                          <span className="event-time">⏰ {event.time}</span>
                        </div>
                        {event.description && (
                          <div className="event-description">{event.description}</div>
                        )}
                      </div>
                      <div className="event-status">
                        <span className="badge badge-overdue">Overdue</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <div className="events-list">
              <h2 className="section-title">📋 All Events ({events.length})</h2>
              <div className="events-table">
                {events
                  .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                  .map((event) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const eventDate = new Date(event.date);
                    eventDate.setHours(0, 0, 0, 0);
                    let statusClass = '';
                    let statusText = 'Pending';

                    if (event.status === 'completed') {
                      statusClass = 'badge-completed';
                      statusText = 'Completed';
                    } else if (eventDate < today) {
                      statusClass = 'badge-overdue';
                      statusText = 'Overdue';
                    } else {
                      statusClass = 'badge-upcoming';
                      statusText = 'Upcoming';
                    }

                    return (
                      <div
                        key={event.id}
                        className={`event-row ${statusClass.replace('badge-', '')}`}
                      >
                        <div className="event-left">
                          <div className="event-title">{event.title}</div>
                          <div className="event-meta">
                            <span className="event-date">{formatDate(event.date)}</span>
                            <span className="event-time">⏰ {event.time}</span>
                          </div>
                          {event.description && (
                            <div className="event-description">{event.description}</div>
                          )}
                        </div>
                        <div className="event-status">
                          <span className={`badge ${statusClass}`}>{statusText}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
