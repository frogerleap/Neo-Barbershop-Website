import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface SidebarLinkProps {
  to: string;
  icon: string;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={[
      'flex items-center gap-3 px-4 py-3 font-black uppercase text-sm rounded-neo transition-all duration-150 border-3',
      active
        ? 'bg-neo-yellow text-neo-black border-neo-black shadow-neo-sm'
        : 'bg-transparent text-neo-white border-transparent hover:bg-neo-white/10 hover:border-neo-white/20',
    ].join(' ')}
  >
    <span className="text-lg w-6 text-center">{icon}</span>
    <span className="hidden xl:block">{label}</span>
  </Link>
);

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarLinks = [
    { to: '/admin',          icon: '📊', label: 'Overview'  },
    { to: '/admin/bookings', icon: '📅', label: 'Bookings'  },
    { to: '/admin/barbers',  icon: '💈', label: 'Barbers'   },
    { to: '/admin/services', icon: '✂️',  label: 'Services'  },
    { to: '/admin/customers',icon: '👥', label: 'Customers' },
    { to: '/admin/revenue',  icon: '💰', label: 'Revenue'   },
    { to: '/admin/settings', icon: '⚙️',  label: 'Settings'  },
  ];

  return (
    <div className="min-h-screen flex bg-neo-light">
      {/* Sidebar */}
      <aside className="w-16 xl:w-64 bg-neo-black flex flex-col border-r-4 border-neo-black shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-4 xl:p-6 border-b-4 border-neo-white/20">
          <Link to="/admin" className="block">
            <span className="text-2xl xl:hidden block text-center">✂</span>
            <span className="hidden xl:block text-neo-yellow font-display text-xl uppercase leading-tight">
              NEO BARBERSHOP<br />
              <span className="text-neo-white/60 text-xs font-sans font-bold normal-case tracking-wide">Admin Panel</span>
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 xl:p-4 flex flex-col gap-1" aria-label="Admin navigation">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              active={location.pathname === link.to}
            />
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="p-3 xl:p-4 border-t-4 border-neo-white/20">
          {user && (
            <div className="hidden xl:flex items-center gap-3 mb-3 px-2">
              <span className="text-2xl">{user.avatar || '👤'}</span>
              <div className="overflow-hidden">
                <p className="text-neo-white font-black text-sm uppercase truncate">{user.name}</p>
                <p className="text-neo-white/50 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            title="Logout"
            className="w-full flex items-center justify-center xl:justify-start gap-3 px-4 py-3 text-neo-pink font-black uppercase text-sm rounded-neo border-3 border-transparent hover:bg-neo-pink hover:text-neo-white hover:border-neo-pink transition-all duration-150"
          >
            <span className="text-lg">↩</span>
            <span className="hidden xl:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-neo-white border-b-4 border-neo-black px-6 xl:px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h1 className="text-xl xl:text-2xl font-display uppercase">
              {sidebarLinks.find((l) => l.to === location.pathname)?.label || 'Admin Panel'}
            </h1>
            <p className="text-xs text-neo-black/50 font-bold">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-black uppercase text-neo-black/60 hover:text-neo-orange transition-colors flex items-center gap-1.5"
          >
            <span>↗</span> View Site
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
