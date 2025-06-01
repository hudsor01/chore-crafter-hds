import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChoreTemplates from "./pages/ChoreTemplates";
import CustomizeChart from "./pages/CustomizeChart";
import ViewChart from "./pages/ViewChart";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import ParentDashboard from "./components/ParentDashboard";
import UserProfile from "./components/UserProfile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

const AppContent = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user } = useAuth();

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-center z-50">
          You are currently offline. The app will continue to work, but some features may be limited.
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Navigate to="/dashboard" /> : <Index />} />
            <Route path="auth" element={<Auth />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="templates" element={<ChoreTemplates />} />
            <Route path="customize/:templateId" element={<CustomizeChart />} />
            <Route path="view/:chartId" element={<ViewChart />} />
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute>
                  <ParentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
