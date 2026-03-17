import { useState } from 'react';
import { sendEventToN8n } from '../services/n8nService';
import '../style/EventInbox.css';

export default function EventInbox() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    studentName: '',
    phoneNumber: '',
    studentEmail: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

      // Send to n8n
      const response = await sendEventToN8n(formData);

      // Reset form
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
        studentName: '',
        phoneNumber: '',
        studentEmail: '',
      });

      setMessage({
        type: 'success',
        text: '✅ Event sent successfully! WhatsApp reminder and Google Calendar event will be created.',
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
          <p>Enter event details and we'll automatically send WhatsApp reminders and create calendar events</p>
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="event-form">
          {/* Student Info Section */}
          <div className="form-section">
            <h2 className="section-title">👤 Student Information</h2>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="studentName">Student Name *</label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentEmail">Gmail Address</label>
                <input
                  type="email"
                  id="studentEmail"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@gmail.com"
                  className="form-input"
                />
              </div>
            </div>
          </div>

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
                Sending to n8n...
              </>
            ) : (
              '🚀 Send to n8n Webhook'
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="info-box">
          <h3>🧠 What happens next:</h3>
          <ol>
            <li>🤖 AI extracts event details and processes them</li>
            <li>📱 WhatsApp reminder sent to your phone</li>
            <li>📅 Google Calendar event automatically created</li>
            <li>🔔 You get notifications on time</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
