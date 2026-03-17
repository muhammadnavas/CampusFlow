import { useEffect, useState } from 'react';
import './App.css';
import EventInbox from './components/EventInbox.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import { getRegisteredStudent, logoutStudent } from './services/authService.js';
import FloatingLines from './style/FloatingLines.jsx';
import Header from './style/Header.jsx';
import HomePage from './style/HomePage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  // Check if student is already registered on app load
  useEffect(() => {
    const student = getRegisteredStudent();
    setRegisteredStudent(student);
    setIsLoading(false);
  }, []);

  // If student is not registered, show login/register page
  if (!registeredStudent && !isLoading) {
    return (
      <>
        {/* Background */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: '#0a0a0f',
        }}>
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>

        {/* Auth Component */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {showLogin ? (
            <Login
              onLoginComplete={(student) => {
                setRegisteredStudent(student);
                setCurrentPage('inbox');
              }}
              onSwitchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <Registration
              onRegistrationComplete={(student) => {
                setRegisteredStudent(student);
                setCurrentPage('inbox');
              }}
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </>
    );
  }

  // Main app layout after registration
  return (
    <>
      {/* Full-viewport background canvas */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0f0a1f 100%)',
      }}>
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Header — sits above the canvas */}
      <Header 
        onPageChange={setCurrentPage} 
        currentPage={currentPage}
        student={registeredStudent}
        onLogout={() => {
          logoutStudent();
          setRegisteredStudent(null);
        }}
      />

      {/* Page content sits above the background */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'inbox' && <EventInbox student={registeredStudent} />}
      </div>
    </>
  );
}

export default App;
