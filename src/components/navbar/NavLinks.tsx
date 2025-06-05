
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface NavLinksProps {
  user: User | null;
}

export const DesktopNavLinks: React.FC<NavLinksProps> = ({ user }) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link 
        to="/templates" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Templates
      </Link>
      <Link 
        to="/pricing" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Pricing
      </Link>
      <Link 
        to="/contact" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 hover:underline underline-offset-4"
      >
        Contact
      </Link>
      {user && (
        <Link 
          to="/dashboard" 
          className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 hover:underline underline-offset-4"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};

export const MobileNavLinks: React.FC<NavLinksProps> = ({ user }) => {
  return (
    <div className="flex flex-col space-y-4 pt-4 border-t border-slate-200">
      <Link 
        to="/templates" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 py-2"
      >
        Templates
      </Link>
      <Link 
        to="/pricing" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 py-2"
      >
        Pricing
      </Link>
      <Link 
        to="/contact" 
        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 py-2"
      >
        Contact
      </Link>
      {user && (
        <Link 
          to="/dashboard" 
          className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-200 py-2"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};
