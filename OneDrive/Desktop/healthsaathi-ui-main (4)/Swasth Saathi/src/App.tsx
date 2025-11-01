import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import HealthVault from "./pages/HealthVault";
import AICompanion from "./pages/AICompanion";
import HospitalNavigator from "./pages/HospitalNavigator";
import Teleconsultation from "./pages/Teleconsultation";
import NGOHub from "./pages/NGOHub";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/health-vault" element={<Layout><HealthVault /></Layout>} />
            <Route path="/ai-companion" element={<Layout><AICompanion /></Layout>} />
            <Route path="/hospital-navigator" element={<Layout><HospitalNavigator /></Layout>} />
            <Route path="/teleconsultation" element={<Layout><Teleconsultation /></Layout>} />
            <Route path="/ngo-hub" element={<Layout><NGOHub /></Layout>} />
            <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
            <Route path="/accessibility" element={<Layout><Accessibility /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProtectedRoute>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
