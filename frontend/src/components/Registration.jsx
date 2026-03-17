import { useEffect, useState } from 'react';
import { checkBackendConnection, registerStudent } from '../services/authService';
import '../style/Registration.css';

export default function Registration({ onRegistrationComplete }) {
  const [formData, setFormData] = useState({
    studentName: '',
    phoneNumber: '',
    studentEmail: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [backendConnected, setBackendConnected] = useState(false);

  // Check backend connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await checkBackendConnection();
        setBackendConnected(connected);
        if (!connected) {
          setMessage({
            type: 'warning',
            text: '⚠️ Backend not connected. Please ensure the server is running on port 5000.',
          });
        }
      } catch (error) {
        console.error('Connection check failed:', error);
      }
    };

    checkConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!backendConnected) {
      setMessage({
        type: 'error',
        text: '❌ Cannot register: Backend is not connected',
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate form
      if (!formData.studentName || !formData.phoneNumber || !formData.studentEmail) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.studentEmail)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone format (basic check)
      if (formData.phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      // Register student
      const response = await registerStudent(formData);

      setMessage({
        type: 'success',
        text: `✅ Welcome ${response.student.name}! Registration complete. You can now add events.`,
      });

      // Call parent callback after 2 seconds
      setTimeout(() => {
        onRegistrationComplete(response.student);
      }, 2000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        {/* Header */}
        <div className="registration-header">
          <div className="registration-icon">📚</div>
          <h1>CampusFlow</h1>
          <p>Smart Student Task & Event Management</p>
        </div>

        {/* Subtitle */}
        <div className="registration-subtitle">
          <h2>Welcome! Let's Get Started</h2>
          <p>Register once to start receiving automatic reminders for your assignments, exams, and college notices</p>
        </div>

        {/* Connection Status */}
        {!backendConnected && (
          <div className="alert alert-warning">
            ⚠️ Backend not connected. Ensure the server is running.
          </div>
        )}

        {/* Alert Messages */}
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="studentName">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
              className="form-input"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentEmail">
              Gmail Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              placeholder="your.email@gmail.com"
              className="form-input"
              disabled={loading}
              required
            />
            <small className="form-hint">📅 Used for Google Calendar integration</small>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">
              WhatsApp Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              className="form-input"
              disabled={loading}
              required
            />
            <small className="form-hint">📱 Include country code (e.g., +91 for India)</small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !backendConnected}
            className={`submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              '✨ Complete Registration'
            )}
          </button>
        </form>

        {/* Features */}
        <div className="registration-features">
          <h3>What You Get:</h3>
          <ul>
            <li>📱 WhatsApp reminders for your events</li>
            <li>📅 Automatic Google Calendar events</li>
            <li>⏰ Never miss assignments or exams again</li>
            <li>🤖 AI-powered event processing</li>
          </ul>
        </div>

        {/* Info Box */}
        <div className="registration-info">
          <strong>ℹ️ Note:</strong> You only need to register once. Your information is securely stored and used to send you reminders.
        </div>
      </div>
    </div>
  );
}
