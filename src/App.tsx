
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/contexts/Web3Context";
import { useState } from "react";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TrackerPage from "./pages/TrackerPage";
import NGOListPage from "./pages/NGOListPage";
import DonatePage from "./pages/DonatePage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a client instance inside the component function
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tracker" element={<TrackerPage />} />
              <Route path="/ngo-list" element={<NGOListPage />} />
              <Route path="/donate" element={<DonatePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
};

export default App;
