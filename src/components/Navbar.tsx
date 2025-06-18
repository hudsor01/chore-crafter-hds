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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-black hover:text-gray-700"
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
