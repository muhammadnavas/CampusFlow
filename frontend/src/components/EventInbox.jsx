import { useEffect, useState } from 'react';
import { getRegisteredStudent } from '../services/authService';
import { sendEventToAutomation } from '../services/eventService';
import '../style/EventInbox.css';

export default function EventInbox({ student }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const [studentInfo, setStudentInfo] = useState(student);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Get student info from localStorage if not passed as prop
  useEffect(() => {
    if (!studentInfo) {
      const registered = getRegisteredStudent();
      setStudentInfo(registered);
    }
  }, [studentInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate form
      if (!formData.title || !formData.date || !formData.time) {
        throw new Error('Please fill in required fields: Title, Date, and Time');
      }

      if (!studentInfo || !studentInfo.id) {
        throw new Error('Student not registered. Please register first.');
      }

      // Send event to backend and n8n
      const response = await sendEventToAutomation(studentInfo.id, formData);

      // Reset form
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
      });

      setMessage({
        type: 'success',
        text: '✅ Event created successfully! WhatsApp reminder and Google Calendar event will be created shortly.',
      });

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-inbox-container">
      <div className="event-inbox-card">
        {/* Header */}
        <div className="inbox-header">
          <h1>📌 Event Inbox</h1>
          <p>Add any task, assignment, exam, or college notice. We'll automatically send WhatsApp reminders and sync with your Google Calendar.</p>
          {studentInfo && (
            <div className="student-info-badge">
              👤 <strong>{studentInfo.name}</strong> | 📱 {studentInfo.phoneNumber}
            </div>
          )}
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="event-form">
          {/* Event Details Section */}
          <div className="form-section">
            <h2 className="section-title">📅 Event Details</h2>

            <div className="form-group">
              <label htmlFor="title">
                Event Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., DSA Assignment, Math Exam, College notice"
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="date">
                  Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">
                  Time <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add any additional details about this event..."
                className="form-textarea"
                rows="4"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating event...
              </>
            ) : (
              '🚀 Create Event'
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="info-box">
          <h3>🚀 CampusFlow Automation Pipeline:</h3>
          <ol>
            <li><strong>✅ Save to Database</strong> - Event securely stored in your profile</li>
            <li><strong>📱 WhatsApp Notification</strong> - Instant reminder to your registered number</li>
            <li><strong>📅 Google Calendar Sync</strong> - Event automatically added to your calendar</li>
            <li><strong>⏰ Scheduled Reminders</strong> - Regular notifications leading up to the event</li>
            <li><strong>✨ Done!</strong> - Never miss a deadline again</li>
          </ol>
          <p style={{
            marginTop: '12px',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
            fontStyle: 'italic'
          }}>
            💡 Tip: Add events as soon as you see your college notices or get assignments to maximize reminder accuracy
          </p>
        </div>
      </div>
    </div>
  );
}
