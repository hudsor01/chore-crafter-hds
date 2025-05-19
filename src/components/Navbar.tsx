
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, Check, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">ChoreChart</span>
          </Link>

          {isMobile ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 py-2">
                  <nav className="flex flex-col">
                    <Link 
                      to="/" 
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/templates" 
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Chore Templates
                    </Link>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <nav className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/templates" className="text-gray-600 hover:text-blue-600">Chore Templates</Link>
              <Button asChild>
                <Link to="/templates">
                  <Check className="mr-2 h-4 w-4" /> Create Chart
                </Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
