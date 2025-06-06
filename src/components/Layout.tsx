
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col ocean-light-gradient">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children || <Outlet />}
      </main>
      <footer className="slate-gradient py-6 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-primary">
                ChoreChart
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                Create beautiful, interactive chore charts for your family.
              </p>
              <div className="flex space-x-3 text-xs">
                <span className="flex items-center space-x-1 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Always Free</span>
                </span>
                <span className="flex items-center space-x-1 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Works Offline</span>
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm">Quick Links</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="/templates" className="hover:text-primary transition-colors">Templates</a></li>
                <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/auth" className="hover:text-primary transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm">Support</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-3 text-center">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} ChoreChart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
