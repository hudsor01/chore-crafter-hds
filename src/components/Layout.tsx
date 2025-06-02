
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Layout = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Check if the app has been installed or if it can be installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      toast({
        title: "App Installed",
        description: "ChoreChart is running as an installed app."
      });
    }

    // Define the event handler for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser prompt
      e.preventDefault();
      // Store the event for later use
      window.deferredPrompt = e as BeforeInstallPromptEvent;
      // Show a toast notification
      toast({
        title: "Install ChoreChart",
        description: "Install this app on your device for offline use",
        action: <button onClick={handleInstallClick} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Install</button>,
        duration: 10000,
      });
    };

    // Listen for beforeinstallprompt event to detect when the app can be installed
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!window.deferredPrompt) {
      return;
    }
    
    // Show the install prompt
    await window.deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await window.deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      toast({
        title: "Thank you!",
        description: "ChoreChart has been installed on your device."
      });
    } else {
      toast({
        title: "Installation declined",
        description: "You can install the app later from the menu."
      });
    }
    
    // Clear the deferredPrompt
    window.deferredPrompt = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-12 text-white shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ChoreChart
              </h3>
              <p className="text-slate-300 text-lg mb-4">
                Create beautiful, interactive chore charts that make household management fun and engaging for the whole family.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-slate-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm">Always Free</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm">Works Offline</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/templates" className="hover:text-indigo-400 transition-colors duration-200">Templates</a></li>
                <li><a href="/pricing" className="hover:text-indigo-400 transition-colors duration-200">Pricing</a></li>
                <li><a href="/auth" className="hover:text-indigo-400 transition-colors duration-200">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} ChoreChart. All rights reserved. Made with ❤️ for families everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
