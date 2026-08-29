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
} from 'lucide-react';
import { Logo } from '../navigation/Logo';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../ui/Toast';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & user dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
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
        'sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-md',
        isScrolled ? 'border-b border-smartdoc-slate-border shadow-subtle py-3' : 'border-b border-slate-100 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                        : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
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
                        'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                          : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
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
                        'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                          : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
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
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Shortcut */}
            <button
              onClick={() => navigate('/documents')}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-smartdoc-slate-muted bg-smartdoc-slate-subtle hover:bg-slate-200/70 border border-smartdoc-slate-border rounded-lg transition-colors"
              title="Search Document Services"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Search services...</span>
              <kbd className="text-[10px] font-mono bg-white px-1 py-0.5 rounded border border-slate-200">
                /
              </kbd>
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            {/* Auth State Switcher */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl border border-smartdoc-slate-border hover:bg-smartdoc-slate-subtle transition-all"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 rounded-lg bg-smartdoc-blue text-white text-xs font-bold flex items-center justify-center">
                    {avatarInitial}
                  </div>
                  <span className="text-xs font-bold text-smartdoc-navy max-w-[120px] truncate">
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
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-smartdoc-slate-border shadow-elevated z-30 p-1.5 divide-y divide-slate-100 animate-in fade-in-50 zoom-in-95 duration-100">
                      <div className="px-3 py-2">
                        <p className="text-xs font-bold text-smartdoc-navy truncate">{user.fullName}</p>
                        <p className="text-[11px] text-smartdoc-slate-muted truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <NavLink
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle rounded-lg"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-smartdoc-blue" />
                          <span>Dashboard Overview</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/documents"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle rounded-lg"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-purple-600" />
                          <span>My Documents Vault</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle rounded-lg"
                        >
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Profile Settings</span>
                        </NavLink>
                        <NavLink
                          to="/dashboard/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle rounded-lg"
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
                          className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left"
                        >
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
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
                  Login
                </Button>

                <Button
                  to="/register"
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
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
              className="p-2 text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-smartdoc-slate-border bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                    isActive
                      ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                      : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
                  )
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                        : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
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
                      'block px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                        : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
                    )
                  }
                >
                  My Documents Vault
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    cn(
                      'block px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'text-smartdoc-blue bg-smartdoc-blue-soft font-semibold'
                        : 'text-smartdoc-slate-text hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle'
                    )
                  }
                >
                  Profile & Settings
                </NavLink>
              </>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <Button
                variant="danger"
                size="md"
                onClick={handleLogout}
                className="w-full justify-center bg-red-600 hover:bg-red-700 text-white font-bold"
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
                  Login
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
