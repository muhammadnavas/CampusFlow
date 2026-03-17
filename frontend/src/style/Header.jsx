export default function Header() {
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                        }}>
                            Vector
                        </span>
                    </div>

                    {/* Nav links */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                        {['Dashboard', 'Test Runs', 'Reports', 'Schemas'].map(link => (
                            <a
                                key={link}
                                href="#"
                                style={{
                                    color: 'rgba(255,255,255,0.55)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    transition: 'color 0.2s',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => e.target.style.color = 'white'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* CTA button */}
                    <button style={{
                        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
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
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        Run Tests
                    </button>

                </div>
            </div>
        </header>
    );
}
