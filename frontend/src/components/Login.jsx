import { useEffect, useState } from 'react';
import { checkBackendConnection, loginStudent } from '../services/authService';
import '../style/Registration.css';

export default function Login({ onLoginComplete, onSwitchToRegister }) {
  const [studentEmail, setStudentEmail] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!backendConnected) {
      setMessage({
        type: 'error',
        text: '❌ Cannot login: Backend is not connected',
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate form
      if (!studentEmail) {
        throw new Error('Please enter your email address');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studentEmail)) {
        throw new Error('Please enter a valid email address');
      }

      // Login student
      const response = await loginStudent(studentEmail);

      setMessage({
        type: 'success',
        text: `✅ Welcome back ${response.student.name}! Logging you in...`,
      });

      // Call parent callback after 2 seconds
      setTimeout(() => {
        onLoginComplete(response.student);
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
          <div className="registration-icon">🔓</div>
          <h1>CampusFlow</h1>
          <p>Welcome Back</p>
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
            <label htmlFor="studentEmail">
              Gmail Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="studentEmail"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              placeholder="your.email@gmail.com"
              className="form-input"
              disabled={loading}
              required
            />
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
                Logging in...
              </>
            ) : (
              '🔑 Login'
            )}
          </button>
        </form>

        {/* Switch to Register Link */}
        <div className="auth-toggle">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="toggle-btn"
              disabled={loading}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
