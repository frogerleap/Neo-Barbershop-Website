import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll for visual feedback
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'admin')  return '/admin';
    if (user.role === 'barber') return '/barber';
    return '/profile';
  };

  const navLinks = [
    { label: 'Services',  href: '/#services' },
    { label: 'Barbers',   href: '/#barbers'  },
    { label: 'Reviews',   href: '/#reviews'  },
  ];

  return (
    <nav
      className={[
        'w-full sticky top-0 z-50 transition-all duration-200',
        'bg-neo-orange border-b-4 border-neo-black',
        isScrolled ? 'shadow-neo-sm' : '',
      ].join(' ')}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center py-4 px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-display uppercase tracking-tight text-neo-black hover:text-neo-white transition-colors duration-150 no-select"
          aria-label="Neo Barbershop Home"
        >
          NEO ✂ BARBERSHOP
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-black uppercase tracking-wide text-neo-black hover:text-neo-white transition-colors duration-150 hover:-translate-y-0.5 transform"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/book"
            id="nav-book-btn"
            className="bg-neo-black text-neo-white font-black uppercase text-sm px-5 py-2.5 border-4 border-neo-black rounded-neo shadow-neo hover:-translate-y-0.5 hover:shadow-neo-md active:translate-y-0.5 active:shadow-neo-xs transition-all duration-150"
          >
            Book Now
          </Link>

          {/* Auth Section */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                id="nav-profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-neo-yellow border-4 border-neo-black rounded-neo px-3 py-2 font-black uppercase text-sm shadow-neo hover:-translate-y-0.5 hover:shadow-neo-md transition-all duration-150"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <span className="text-lg">{user.avatar || '👤'}</span>
                <span className="hidden lg:block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-neo-white border-4 border-neo-black shadow-neo-md rounded-neo animate-slide-down">
                  <div className="p-4 border-b-4 border-neo-black bg-neo-yellow rounded-t-neo">
                    <p className="font-black uppercase text-sm truncate">{user.name}</p>
                    <p className="text-xs font-bold text-neo-black/60 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 bg-neo-black text-neo-white text-xs font-black uppercase px-2 py-0.5 rounded-neo">
                      {user.role}
                    </span>
                  </div>
                  <div className="p-2 flex flex-col">
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center gap-2 px-3 py-2.5 font-bold text-sm hover:bg-neo-yellow rounded-neo transition-colors"
                    >
                      <span>📊</span> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2.5 font-bold text-sm hover:bg-neo-yellow rounded-neo transition-colors"
                    >
                      <span>👤</span> My Profile
                    </Link>
                    <hr className="my-1 border-2 border-neo-black" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2.5 font-black text-sm text-neo-pink hover:bg-neo-pink hover:text-neo-white rounded-neo transition-colors w-full text-left uppercase"
                    >
                      <span>↩</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/login"
                id="nav-login-btn"
                className="font-black uppercase text-sm text-neo-black hover:text-neo-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                id="nav-register-btn"
                className="bg-neo-yellow border-4 border-neo-black text-neo-black font-black uppercase text-sm px-4 py-2 rounded-neo shadow-neo hover:-translate-y-0.5 hover:shadow-neo-md transition-all duration-150"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="nav-mobile-menu-btn"
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[6px] border-4 border-neo-black bg-neo-white rounded-neo shadow-neo-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-neo-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-neo-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-neo-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-neo-white border-t-4 border-neo-black animate-slide-down">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-black uppercase text-lg text-neo-black hover:text-neo-orange transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/book"
              className="bg-neo-black text-neo-white font-black uppercase text-center py-3 border-4 border-neo-black rounded-neo shadow-neo"
              onClick={() => setMenuOpen(false)}
            >
              Book Now ✂
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="font-black uppercase text-lg text-neo-black hover:text-neo-orange transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-neo-pink font-black uppercase text-lg text-left hover:text-neo-pink/80 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center border-4 border-neo-black font-black uppercase py-2.5 rounded-neo shadow-neo"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center bg-neo-yellow border-4 border-neo-black font-black uppercase py-2.5 rounded-neo shadow-neo"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
