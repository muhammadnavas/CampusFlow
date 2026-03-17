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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          animation: 'float 6s infinite ease-in-out',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          animation: 'float 8s infinite ease-in-out reverse',
        }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(20, 20, 40, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        borderRadius: '20px',
        padding: '50px 40px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.1)',
        animation: 'slideUp 0.6s ease-out',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎓</div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            margin: '0 0 8px',
            background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            CampusFlow
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: '#a0aec0',
            margin: 0,
            fontWeight: 500,
          }}>
            Smart Campus Assistant
          </p>
        </div>

        {/* Connection Status */}
        {!backendConnected && (
          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: '#fcd34d',
            textAlign: 'center',
            animation: 'slideUp 0.6s ease-out 0.1s both',
          }}>
            ⚠️ Backend not connected. Ensure the server is running.
          </div>
        )}

        {/* Alert Messages */}
        {message.text && (
          <div style={{
            background: message.type === 'success' 
              ? 'rgba(34, 197, 94, 0.1)' 
              : message.type === 'error'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(251, 191, 36, 0.1)',
            border: `1px solid ${
              message.type === 'success'
                ? 'rgba(34, 197, 94, 0.3)'
                : message.type === 'error'
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(251, 191, 36, 0.3)'
            }`,
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: message.type === 'success'
              ? '#86efac'
              : message.type === 'error'
              ? '#fca5a5'
              : '#fcd34d',
            textAlign: 'center',
            animation: 'slideUp 0.6s ease-out 0.2s both',
          }}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Full Name */}
          <div style={{ animation: 'slideUp 0.6s ease-out 0.2s both' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#e2e8f0',
            }}>
              Full Name <span style={{ color: '#f87171' }}>*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              placeholder="John Doe"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: 'rgba(124, 58, 237, 0.05)',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.6)';
                e.target.style.background = 'rgba(124, 58, 237, 0.1)';
                e.target.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Email */}
          <div style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#e2e8f0',
            }}>
              Gmail Address <span style={{ color: '#f87171' }}>*</span>
            </label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              placeholder="your.email@gmail.com"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: 'rgba(124, 58, 237, 0.05)',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.6)';
                e.target.style.background = 'rgba(124, 58, 237, 0.1)';
                e.target.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Phone */}
          <div style={{ animation: 'slideUp 0.6s ease-out 0.4s both' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#e2e8f0',
            }}>
              WhatsApp Number <span style={{ color: '#f87171' }}>*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: 'rgba(124, 58, 237, 0.05)',
                color: '#e2e8f0',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.6)';
                e.target.style.background = 'rgba(124, 58, 237, 0.1)';
                e.target.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !backendConnected}
            style={{
              marginTop: '16px',
              padding: '14px 24px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '10px',
              border: 'none',
              background: loading || !backendConnected
                ? 'rgba(124, 58, 237, 0.3)'
                : 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
              color: 'white',
              cursor: loading || !backendConnected ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading || !backendConnected
                ? 'none'
                : '0 0 30px rgba(124, 58, 237, 0.4)',
              animation: 'slideUp 0.6s ease-out 0.5s both',
              opacity: loading || !backendConnected ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading && backendConnected) {
                e.target.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.7)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && backendConnected) {
                e.target.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.4)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  animation: 'spin 0.8s linear infinite',
                  marginRight: '8px',
                  verticalAlign: 'middle',
                }}>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </span>
                Registering...
              </>
            ) : (
              '✨ Get Started'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
