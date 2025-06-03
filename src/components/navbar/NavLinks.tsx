
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = memo(({ to, children, className = "", onClick }: NavLinkProps) => (
  <Link 
    to={to}
    className={`text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium relative group ${className}`}
    onClick={onClick}
  >
    {children}
    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
  </Link>
));

NavLink.displayName = 'NavLink';

export const DesktopNavLinks = memo(({ user }: { user: any }) => (
  <div className="hidden md:flex items-center space-x-8">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/templates">Templates</NavLink>
    <NavLink to="/pricing">Pricing</NavLink>
    {user && <NavLink to="/dashboard">Dashboard</NavLink>}
  </div>
));

DesktopNavLinks.displayName = 'DesktopNavLinks';

export const MobileNavLinks = memo(({ user, onLinkClick }: { user: any; onLinkClick: () => void }) => (
  <div className="flex flex-col space-y-3 pt-4">
    <NavLink to="/" className="px-4 py-3 rounded-md hover:bg-slate-50" onClick={onLinkClick}>
      Home
    </NavLink>
    <NavLink to="/templates" className="px-4 py-3 rounded-md hover:bg-slate-50" onClick={onLinkClick}>
      Templates
    </NavLink>
    <NavLink to="/pricing" className="px-4 py-3 rounded-md hover:bg-slate-50" onClick={onLinkClick}>
      Pricing
    </NavLink>
    {user && (
      <>
        <NavLink to="/dashboard" className="px-4 py-3 rounded-md hover:bg-slate-50" onClick={onLinkClick}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="px-4 py-3 rounded-md hover:bg-slate-50" onClick={onLinkClick}>
          Profile
        </NavLink>
      </>
    )}
  </div>
));

MobileNavLinks.displayName = 'MobileNavLinks';
