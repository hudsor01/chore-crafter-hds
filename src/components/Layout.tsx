
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children || <Outlet />}
      </main>
      <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 py-6 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-cyan-300">
                ChoreChart
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                Create beautiful, interactive chore charts for your family.
              </p>
              <div className="flex space-x-3 text-xs">
                <span className="flex items-center space-x-1 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  <span>Always Free</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  <span>Works Offline</span>
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-cyan-200">Quick Links</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li><a href="/templates" className="hover:text-cyan-300 transition-colors">Templates</a></li>
                <li><a href="/pricing" className="hover:text-cyan-300 transition-colors">Pricing</a></li>
                <li><a href="/auth" className="hover:text-cyan-300 transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-cyan-200">Support</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-600 pt-3 text-center">
            <p className="text-slate-400 text-xs">
              &copy; {new Date().getFullYear()} ChoreChart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
