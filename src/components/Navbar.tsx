
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
            ChoreChart
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-indigo-50"
            >
              Pricing
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-indigo-50"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth Section - Enhanced */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 px-3 flex items-center space-x-2 hover:bg-indigo-50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.user_metadata?.full_name || 'Account'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t bg-white">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/templates" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-indigo-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-indigo-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mx-4"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              )}
              {!user && (
                <div className="flex flex-col space-y-3 px-4 pt-2">
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
