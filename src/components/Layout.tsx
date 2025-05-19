
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
        action: <button onClick={handleInstallClick} className="px-4 py-2 bg-primary text-primary-foreground rounded">Install</button>,
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white py-4 shadow-inner">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} ChoreChart - Create beautiful chore charts for your family
        </div>
      </footer>
    </div>
  );
};

export default Layout;
