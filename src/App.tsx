import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChoreProvider } from "@/contexts/ChoreContext";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ShortcutsDialog from "@/components/shortcuts/ShortcutsDialog";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ChoreTemplates from "./pages/ChoreTemplates";
import CustomizeChart from "./pages/CustomizeChart";
import ViewChart from "./pages/ViewChart";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Force override any yellow or problematic colors dynamically
    const fixColors = () => {
      // Fix yellow backgrounds
      document.querySelectorAll("*").forEach((el) => {
        const element = el as HTMLElement;
        const style = window.getComputedStyle(element);

        // Check for yellow backgrounds
        if (
          style.backgroundColor === "rgb(255, 255, 0)" ||
          style.backgroundColor === "yellow" ||
          element.style.backgroundColor === "rgb(255, 255, 0)" ||
          element.style.backgroundColor === "yellow"
        ) {
          element.style.backgroundColor = "hsl(188 85% 47%)";
          element.style.color = "white";
        }

        // Check for the problematic brown-yellow color
        if (
          style.color === "rgb(193, 150, 108)" ||
          element.style.color === "rgb(193, 150, 108)"
        ) {
          element.style.color = "hsl(215 25% 44%)";
        }
      });
    };

    // Force remove any persistent toasts on app load
    const removeToasts = () => {
      const toastSelectors = [
        ".Toaster",
        "[data-sonner-toaster]",
        ".sonner-toast",
        "[data-toast-viewport]",
        "[data-radix-toast-viewport]",
        ".toast-viewport",
        'div[data-state="open"][data-swipe-direction]',
        'div[role="status"][aria-live="polite"]',
        'div[role="region"][aria-label*="toast"]',
        'div[role="region"][aria-label*="Notification"]',
      ];

      toastSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          (el as HTMLElement).style.display = "none";
          (el as HTMLElement).style.visibility = "hidden";
          (el as HTMLElement).style.opacity = "0";
          (el as HTMLElement).remove();
        });
      });
    };

    // Remove on load and set interval to catch any new ones
    removeToasts();
    fixColors();

    const toastInterval = setInterval(removeToasts, 100);
    const colorInterval = setInterval(fixColors, 500);

    return () => {
      clearInterval(toastInterval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChoreProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/templates" element={<ChoreTemplates />} />
                  <Route
                    path="/customize/:templateId"
                    element={<CustomizeChart />}
                  />
                  <Route path="/chart/:chartId" element={<ViewChart />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
              <ShortcutsDialog />
            </BrowserRouter>
          </TooltipProvider>
        </ChoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
