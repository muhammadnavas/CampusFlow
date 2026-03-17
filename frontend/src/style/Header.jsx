export default function Header({ onPageChange, currentPage, student, onLogout }) {
    const handleNavClick = (page) => {
        onPageChange?.(page);
    };

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
        }}>
            <div style={{
                margin: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(100, 80, 180, 0.15)',
                background: 'rgba(10, 8, 25, 0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(130,100,255,0.08)',
            }}>
                {/* Inner row — all inline flex */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 24px',
                }}>

                    {/* Logo / Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleNavClick('home')}>
                        <span style={{
                            fontSize: '1.2rem',
                        }}>
                            📚
                        </span>
                        <span style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                        }}>
                            CampusFlow
                        </span>
                    </div>

                    {/* Nav links */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                        {[
                            { label: 'Home', page: 'home' },
                            { label: 'Event Inbox', page: 'inbox' }
                        ].map(({ label, page }) => (
                            <button
                                key={page}
                                onClick={() => handleNavClick(page)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: currentPage === page ? '#a78bfa' : 'rgba(255,255,255,0.55)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: currentPage === page ? 600 : 500,
                                    transition: 'color 0.2s',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    padding: '8px 0',
                                    borderBottom: currentPage === page ? '2px solid #a78bfa' : '2px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (currentPage !== page) {
                                        e.target.style.color = 'white';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (currentPage !== page) {
                                        e.target.style.color = 'rgba(255,255,255,0.55)';
                                    }
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Right side buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Student info */}
                        {student && (
                            <span style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.55)',
                                paddingRight: '12px',
                                borderRight: '1px solid rgba(255,255,255,0.1)',
                            }}>
                                👤 {student.name}
                            </span>
                        )}

                        {/* Action button */}
                        <button style={{
                            background: currentPage === 'inbox' ? 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 20px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 12px rgba(124,58,237,0.35)',
                            transition: 'opacity 0.2s',
                            flexShrink: 0,
                        }}
                            onClick={() => handleNavClick('inbox')}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            + Add Event
                        </button>

                        {/* Logout button */}
                        {student && (
                            <button style={{
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.55)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                padding: '6px 14px',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                flexShrink: 0,
                            }}
                                onClick={onLogout}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                    e.target.style.color = '#fca5a5';
                                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = 'rgba(255,255,255,0.55)';
                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                            >
                                🚪 Logout
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}
