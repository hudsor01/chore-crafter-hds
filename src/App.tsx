
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChoreProvider } from "@/contexts/ChoreContext";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import ShortcutsDialog from "@/components/shortcuts/ShortcutsDialog";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ChoreTemplates from "./pages/ChoreTemplates";
import CustomizeChart from "./pages/CustomizeChart";
import ViewChart from "./pages/ViewChart";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import ColorTestPage from "./pages/ColorTestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
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
                  <Route path="/customize/:templateId" element={<CustomizeChart />} />
                  <Route path="/chart/:chartId" element={<ViewChart />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/color-test" element={<ColorTestPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
              <OnboardingFlow 
                isOpen={showOnboarding} 
                onClose={() => setShowOnboarding(false)} 
              />
              <ShortcutsDialog />
            </BrowserRouter>
          </TooltipProvider>
        </ChoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
