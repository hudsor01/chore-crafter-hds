
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 text-white shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">ChoreChart</h3>
            <p className="text-indigo-100">Create beautiful chore charts for your family</p>
          </div>
          <div className="text-sm text-indigo-200">
            &copy; {new Date().getFullYear()} ChoreChart - All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
