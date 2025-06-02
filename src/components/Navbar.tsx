
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
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            ChoreChart
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium relative group"
            >
              Home
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/templates" 
              className="text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium relative group"
            >
              Templates
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium relative group"
            >
              Pricing
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="text-slate-700 hover:text-indigo-600 transition-all duration-200 font-medium relative group"
              >
                Dashboard
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 px-3 flex items-center space-x-2 hover:bg-slate-100 transition-all duration-200">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700">{user.user_metadata?.full_name || 'Account'}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-slate-200 shadow-xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-900">{user.user_metadata?.full_name}</p>
                      <p className="text-xs leading-none text-slate-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer hover:bg-slate-50 transition-colors duration-150"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer hover:bg-slate-50 transition-colors duration-150"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-all duration-200">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
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
              className="p-2 hover:bg-slate-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/templates" 
                className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                to="/pricing" 
                className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-4 py-3 rounded-md hover:bg-slate-50"
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
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
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
