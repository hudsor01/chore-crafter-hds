import React from "react";
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";

interface NavLinksProps {
  user: User | null;
  onLinkClick?: () => void;
}

export const DesktopNavLinks: React.FC<NavLinksProps> = ({ user }) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        to="/templates"
        className="text-gray-700 hover:text-black font-medium"
      >
        Templates
      </Link>
      <Link
        to="/pricing"
        className="text-gray-700 hover:text-black font-medium"
      >
        Pricing
      </Link>
      <Link
        to="/contact"
        className="text-gray-700 hover:text-black font-medium"
      >
        Contact
      </Link>
      {user && (
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-black font-medium"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};

export const MobileNavLinks: React.FC<NavLinksProps> = ({
  user,
  onLinkClick,
}) => {
  return (
    <div className="flex flex-col space-y-4 pt-4 border-t border-slate-200">
      <Link
        to="/templates"
        className="text-gray-700 hover:text-black font-medium py-2"
        onClick={onLinkClick}
      >
        Templates
      </Link>
      <Link
        to="/pricing"
        className="text-gray-700 hover:text-black font-medium py-2"
        onClick={onLinkClick}
      >
        Pricing
      </Link>
      <Link
        to="/contact"
        className="text-gray-700 hover:text-black font-medium py-2"
        onClick={onLinkClick}
      >
        Contact
      </Link>
      {user && (
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-black font-medium py-2"
          onClick={onLinkClick}
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};
