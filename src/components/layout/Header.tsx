import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  ArrowRight,
  User,
  LogOut,
  FolderOpen,
  LayoutDashboard,
  Settings,
  ChevronDown,
  ShieldCheck,
  Bell,
} from 'lucide-react';
import { Logo } from '../navigation/Logo';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../ui/Toast';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & user dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      showToast('You have been signed out.', 'info');
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Documents', path: '/documents' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  const avatarInitial = (user?.fullName || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200 bg-white border-b border-slate-200/80',
        isScrolled ? 'shadow-xs py-2.5' : 'py-3'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors',
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Authenticated Dashboard Quick Links */}
              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      cn(
                        'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors',
                        isActive
                          ? 'text-indigo-600 bg-indigo-50 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      )
                    }
                    end
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/documents"
                    className={({ isActive }) =>
                      cn(
                        'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors',
                        isActive
                          ? 'text-indigo-600 bg-indigo-50 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      )
                    }
                  >
                    My Documents
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Search Input Box */}
            <button
              onClick={() => navigate('/documents')}
              className="flex items-center gap-3 px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full transition-colors w-64 justify-between"
              title="Search documents, categories..."
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-normal">Search documents, categories...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded-md border border-slate-200 text-slate-400">
                /
              </kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-card-hover z-30 p-3 animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">3 New</span>
                    </div>
                    <div className="pt-2.5 space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Encrypted Vault Active</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Your personal storage is isolated with PostgreSQL Row Level Security.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-[11px]">
                          <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
                          <span>34 Verified Portals Online</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          All external links have been audited and verified safe.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200/90 hover:bg-slate-50 transition-all"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-bold flex items-center justify-center">
                    {avatarInitial}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                    {user.fullName || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-200/90 shadow-card-hover z-30 p-1.5 divide-y divide-slate-100 animate-in fade-in-50 zoom-in-95 duration-100">
                      <div className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 mb-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified User</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <NavLink
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Dashboard Overview</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/documents"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-violet-600" />
                          <span>My Documents Vault</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                        >
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Profile Settings</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-500" />
                          <span>Account Security</span>
                        </NavLink>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl text-left font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button
                  to="/login"
                  variant="ghost"
                  size="sm"
                  leftIcon={User}
                >
                  Sign In
                </Button>

                <Button
                  to="/register"
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
                  className="shadow-xs font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => navigate('/documents')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            {user && (
              <NavLink
                to="/dashboard/profile"
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-bold flex items-center justify-center shadow-xs"
              >
                {avatarInitial}
              </NavLink>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/90 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  )
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <>
                <div className="pt-2 pb-1 border-t border-slate-100 my-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">
                    Vault & Account
                  </span>
                </div>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    )
                  }
                  end
                >
                  Dashboard Overview
                </NavLink>
                <NavLink
                  to="/dashboard/documents"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    )
                  }
                >
                  My Documents Vault
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    )
                  }
                >
                  Profile Settings
                </NavLink>
                <NavLink
                  to="/dashboard/settings"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    )
                  }
                >
                  Account Security
                </NavLink>
              </>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <Button
                variant="danger"
                size="md"
                onClick={handleLogout}
                className="w-full justify-center"
                leftIcon={LogOut}
              >
                Sign Out ({user.email.split('@')[0]})
              </Button>
            ) : (
              <>
                <Button
                  to="/login"
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                  leftIcon={User}
                >
                  Sign In
                </Button>
                <Button
                  to="/register"
                  variant="primary"
                  size="md"
                  className="w-full justify-center font-bold"
                  rightIcon={ArrowRight}
                >
                  Create Free Account
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
