import React, { useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DesktopNavLinks } from "./navbar/NavLinks";
import { DesktopAuthSection } from "./navbar/AuthSection";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = memo(() => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  console.log("Navbar rendering - User:", user ? "Logged in" : "Not logged in");

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-md shadow-lg border-b border-slate-600 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-300 hover:text-cyan-200 transition-all duration-300"
          >
            ChoreChart
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavLinks user={user} />

          {/* Desktop Auth Section */}
          <DesktopAuthSection user={user} signOut={signOut} />

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
            user={user}
            signOut={signOut}
          />
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
