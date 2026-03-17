import { useEffect, useState } from 'react';
import { getRegisteredStudent } from '../services/authService';
import { sendEventToAutomation } from '../services/eventService';
import { extractEventFromText, validateExtractedEvent } from '../services/geminiService';
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
  const [showParseSection, setShowParseSection] = useState(false);
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);

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

      // Send event to backend and n8n with student contact info
      const eventDataWithContact = {
        ...formData,
        phoneNumber: studentInfo.phoneNumber,
        studentEmail: studentInfo.email,
      };
      const response = await sendEventToAutomation(studentInfo.id, eventDataWithContact);

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

  const handleParseText = async () => {
    setParsing(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await extractEventFromText(rawText);

      if (!result.success) {
        throw new Error(result.error);
      }

      // Validate extracted data
      const validation = validateExtractedEvent(result.data);
      if (!validation.isValid) {
        throw new Error(`Validation failed:\n${validation.errors.join('\n')}`);
      }

      // Populate form with extracted data
      setFormData({
        title: result.data.title,
        date: result.data.date,
        time: result.data.time,
        description: result.data.description,
      });

      setMessage({
        type: 'success',
        text: '✅ Event details extracted! Review and submit to create the event.',
      });

      // Hide parse section after successful extraction
      setShowParseSection(false);
      setRawText('');

    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Parsing error: ${error.message}`,
      });
    } finally {
      setParsing(false);
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

        {/* AI Text Parser Section */}
        <div style={{
          marginBottom: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(167, 139, 250, 0.3)',
          background: 'rgba(167, 139, 250, 0.08)',
          overflow: 'hidden',
        }}>
          <button
            type="button"
            onClick={() => setShowParseSection(!showParseSection)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: 'none',
              color: '#a78bfa',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(167, 139, 250, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🤖</span>
            <span style={{ 
              fontSize: '1.2rem', 
              transition: 'transform 0.2s ease',
              transform: showParseSection ? 'rotate(0deg)' : 'rotate(-90deg)',
              display: 'inline-block'
            }}>
              ▼
            </span>
            Parse College Notice with AI
          </button>

          {showParseSection && (
            <div style={{ marginTop: 0, padding: '16px' }}>
              <label htmlFor="rawText" style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)',
              }}>
                Paste your college notice or assignment details:
              </label>
              <textarea
                id="rawText"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your college notice, assignment sheet, or exam details here... Example: 'DSA Assignment due on March 25, 2026 at 5 PM. Submit online.'"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  background: 'rgba(10, 8, 25, 0.8)',
                  color: 'white',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  minHeight: '100px',
                  resize: 'vertical',
                  marginBottom: '12px',
                }}
                disabled={parsing}
              />
              <button
                type="button"
                onClick={handleParseText}
                disabled={parsing || !rawText.trim()}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: parsing ? 'rgba(167, 139, 250, 0.3)' : 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: parsing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {parsing ? (
                  <>
                    <span style={{ marginRight: '8px' }}>⏳</span>
                    Extracting with Gemini AI...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '8px' }}>✨</span>
                    Extract Event Details with AI
                  </>
                )}
              </button>
            </div>
          )}
        </div>

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
