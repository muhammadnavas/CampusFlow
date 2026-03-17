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
          <div className="registration-icon">🎓</div>
          <h1>CampusFlow</h1>
          <p>AI-Powered Student Task & Notice Management System</p>
        </div>

        {/* Subtitle */}
        <div className="registration-subtitle">
          <h2>Welcome to Your Smart Campus Assistant!</h2>
          <p>Convert college notices, assignments, and deadlines into automated reminders. One-time registration required.</p>
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
          <h3>🚀 Features:</h3>
          <ul>
            <li>📱 <strong>WhatsApp Reminders</strong> - Get instant notifications for all your tasks</li>
            <li>📅 <strong>Google Calendar Sync</strong> - Events automatically added to your calendar</li>
            <li>🎯 <strong>Smart Processing</strong> - Understands assignments, exams, and notices automatically</li>
            <li>⏰ <strong>Never Miss Deadlines</strong> - Timely reminders before important dates</li>
            <li>🔐 <strong>Secure & Private</strong> - Your data is encrypted and only used for reminders</li>
          </ul>
        </div>

        {/* Info Box */}
        <div className="registration-info">
          <strong>ℹ️ About CampusFlow:</strong><br/>
          CampusFlow is an intelligent notification system that helps students never miss important college deadlines. Simply feed your event details to our system, and we'll handle WhatsApp reminders and calendar synchronization automatically. Your registration is one-time, secure, and GDPR-compliant.
        </div>
      </div>
    </div>
  );
}
