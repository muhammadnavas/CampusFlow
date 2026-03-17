import { useState } from 'react';

export default function Header({ onPageChange, currentPage, student, onLogout }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (page) => {
        onPageChange?.(page);
        setMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'Home', page: 'home' },
        { label: 'Event Inbox', page: 'inbox' },
        { label: 'Dashboard', page: 'dashboard' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Main header container */}
            <div className="mx-3 md:mx-4 lg:mx-6 rounded-2xl border border-purple-900/15 bg-slate-950/60 backdrop-blur-2xl shadow-lg shadow-black/50" 
                 style={{
                     boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(130,100,255,0.08)',
                 }}>
                
                {/* Header content */}
                <div className="flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3">
                    
                    {/* Logo / Brand */}
                    <div 
                        className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleNavClick('home')}
                    >
                        <span className="text-2xl md:text-3xl">🎓</span>
                        <span className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">
                            CampusFlow
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                        {navItems.map(({ label, page }) => (
                            <button
                                key={page}
                                onClick={() => handleNavClick(page)}
                                className={`text-sm lg:text-base font-medium transition-colors duration-200 pb-2 border-b-2 whitespace-nowrap ${
                                    currentPage === page
                                        ? 'text-purple-300 border-purple-300'
                                        : 'text-white/50 border-transparent hover:text-white'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Right side - Desktop buttons */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3">
                        {/* Student info */}
                        {student && (
                            <span className="text-xs lg:text-sm text-white/50 pr-3 lg:pr-4 border-r border-white/10 whitespace-nowrap">
                                👤 {student.name}
                            </span>
                        )}

                        {/* Add Event button */}
                        <button
                            onClick={() => handleNavClick('inbox')}
                            className={`px-3 lg:px-5 py-2 text-sm lg:text-base font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                                currentPage === 'inbox'
                                    ? 'bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg shadow-purple-600/50'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30'
                            } text-white`}
                        >
                            + Add Event
                        </button>

                        {/* Logout button */}
                        {student && (
                            <button
                                onClick={onLogout}
                                className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-white/50 border border-white/20 rounded-lg transition-all duration-200 hover:text-red-300 hover:border-red-400/30 hover:bg-red-500/5 whitespace-nowrap"
                            >
                                🚪 Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-purple-900/15 bg-slate-900/40">
                        {/* Mobile navigation */}
                        <nav className="flex flex-col">
                            {navItems.map(({ label, page }) => (
                                <button
                                    key={page}
                                    onClick={() => handleNavClick(page)}
                                    className={`px-6 py-3 text-left text-sm font-medium transition-all duration-200 border-l-2 ${
                                        currentPage === page
                                            ? 'bg-purple-600/10 text-purple-300 border-purple-300'
                                            : 'text-white/60 border-transparent hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>

                        {/* Mobile action buttons */}
                        <div className="flex flex-col gap-2 p-4 border-t border-purple-900/15">
                            {/* Student info for mobile */}
                            {student && (
                                <div className="text-xs text-white/50 px-2 py-1">
                                    👤 {student.name}
                                </div>
                            )}

                            {/* Add Event button - mobile */}
                            <button
                                onClick={() => handleNavClick('inbox')}
                                className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                    currentPage === 'inbox'
                                        ? 'bg-gradient-to-r from-purple-400 to-purple-600'
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-600/30'
                                } text-white`}
                            >
                                + Add Event
                            </button>

                            {/* Logout button - mobile */}
                            {student && (
                                <button
                                    onClick={onLogout}
                                    className="w-full px-4 py-2.5 text-sm font-medium text-white/50 border border-white/20 rounded-lg transition-all duration-200 hover:text-red-300 hover:border-red-400/30 hover:bg-red-500/5"
                                >
                                    🚪 Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
