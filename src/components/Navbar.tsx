
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, Check, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 lg:h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
            <span className="text-lg lg:text-xl font-bold text-gray-800">ChoreChart</span>
          </Link>

          {isMobile ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-14 left-0 right-0 bg-white shadow-lg z-50 border-t">
                  <nav className="flex flex-col py-2">
                    <Link 
                      to="/" 
                      className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/templates" 
                      className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={closeMenu}
                    >
                      Chore Templates
                    </Link>
                    {user ? (
                      <>
                        <Link 
                          to="/dashboard" 
                          className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          onClick={closeMenu}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/profile" 
                          className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          onClick={closeMenu}
                        >
                          Profile
                        </Link>
                        <button 
                          onClick={handleSignOut}
                          className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 text-left transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link 
                        to="/auth" 
                        className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        onClick={closeMenu}
                      >
                        Sign In
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </>
          ) : (
            <nav className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/templates" className="text-gray-600 hover:text-blue-600 transition-colors">Chore Templates</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/templates">
                      <Check className="mr-2 h-4 w-4" /> Create Chart
                    </Link>
                  </Button>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
