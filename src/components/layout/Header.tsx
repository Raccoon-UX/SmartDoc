import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ArrowRight, User } from 'lucide-react';
import { Logo } from '../navigation/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Documents', path: '/documents' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

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

            {/* Login Link */}
            <Button
              to="/login"
              variant="ghost"
              size="sm"
              leftIcon={User}
            >
              Login
            </Button>

            {/* Get Started CTA */}
            <Button
              to="/dashboard"
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
            >
              Get Started
            </Button>
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
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
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
              to="/dashboard"
              variant="primary"
              size="md"
              className="w-full justify-center"
              rightIcon={ArrowRight}
            >
              Get Started (Dashboard)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
