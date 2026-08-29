import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, User, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const DashboardNav: React.FC = () => {
  const tabs = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Documents', path: '/dashboard/documents', icon: FolderOpen },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="border-b border-slate-200/80 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
      <nav className="flex items-center gap-2 sm:gap-4 min-w-max pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap',
                  isActive
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                )
              }
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
