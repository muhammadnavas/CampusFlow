export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '120px 24px 60px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎓</div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          margin: '0 0 24px',
          background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6366f1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CampusFlow
        </h1>

        <p style={{
          fontSize: '1.3rem',
          color: '#a0aec0',
          lineHeight: 1.8,
          maxWidth: '700px',
          margin: '0 auto 40px',
        }}>
          Transform college notices, assignments, and deadlines into intelligent reminders.
        </p>

        <p style={{
          fontSize: '1rem',
          color: '#718096',
          lineHeight: 1.7,
          maxWidth: '700px',
          margin: '0 auto 50px',
        }}>
          One-time registration. Smart processing. Never miss a deadline again.
        </p>

        <button style={{
          padding: '14px 40px',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '10px',
          border: 'none',
          background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.7)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.4)';
          e.target.style.transform = 'translateY(0)';
        }}>
          ✨ Get Started
        </button>
      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: '1100px',
        margin: '80px auto',
        padding: '0 24px',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '60px',
          color: '#e2e8f0',
        }}>
          🚀 Why CampusFlow?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {[
            {
              icon: '📱',
              title: 'WhatsApp Reminders',
              desc: 'Get instant notifications for all your tasks and deadlines',
            },
            {
              icon: '📅',
              title: 'Google Calendar Sync',
              desc: 'Events automatically added to your calendar',
            },
            {
              icon: '🎯',
              title: 'Smart Processing',
              desc: 'AI understands assignments, exams, and notices',
            },
            {
              icon: '⏰',
              title: 'Never Miss Deadlines',
              desc: 'Timely reminders before important dates',
            },
            {
              icon: '🔐',
              title: 'Secure & Private',
              desc: 'Your data is encrypted and secure',
            },
            {
              icon: '⚡',
              title: 'One-Time Setup',
              desc: 'Register once, get reminders forever',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                borderRadius: '12px',
                padding: '28px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(124, 58, 237, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: '#e2e8f0' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#a0aec0', lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: '1100px',
        margin: '80px auto',
        padding: '0 24px',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '60px',
          color: '#e2e8f0',
        }}>
          📋 How CampusFlow Works
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
        }}>
          {[
            { num: 1, title: 'Register', desc: 'Share your email and phone number' },
            { num: 2, title: 'Paste Content', desc: 'Add college notices and assignments' },
            { num: 3, title: 'AI Processes', desc: 'Our AI extracts important details' },
            { num: 4, title: 'Get Reminders', desc: 'Receive notifications on WhatsApp' },
          ].map((step, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '1.8rem',
                fontWeight: 700,
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: '#e2e8f0' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{
        textAlign: 'center',
        padding: '80px 24px 60px',
        borderTop: '1px solid rgba(124, 58, 237, 0.2)',
        marginTop: '80px',
      }}>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#e2e8f0',
        }}>
          Ready to transform your campus life?
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#a0aec0',
          marginBottom: '32px',
        }}>
          Start your free registration today.
        </p>
        <button style={{
          padding: '14px 40px',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '10px',
          border: 'none',
          background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.7)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.4)';
          e.target.style.transform = 'translateY(0)';
        }}>
          📝 Register Now
        </button>
      </section>
    </div>
  );
}
