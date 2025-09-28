import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import { CompareProvider } from "@/hooks/use-compare";
import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import BikeDetail from "@/pages/BikeDetail";
import Upcoming from "@/pages/Upcoming";
import Sell from "@/pages/Sell";
import Community from "@/pages/Community";
import DealerDashboard from "@/pages/DealerDashboard";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/login";
import Register from "@/pages/registration";
import CustomerCare from "@/pages/CustomerCare";
import UsedBikes from "@/pages/UsedBikes";
import Compare from "@/pages/Compare";
import NotFound from "@/pages/NotFound";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Chatbot from "@/components/Chatbot";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WishlistProvider } from "@/hooks/use-wishlist";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vahan-ui-theme">
      <AuthProvider>
        <CompareProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LanguageProvider>
              <BrowserRouter>
                <WishlistProvider>
                  <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary-light/20">
                    <Navigation />
                    <main className="spacious-container">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/browse" element={<Browse />} />
                      <Route path="/bike/:id" element={<BikeDetail />} />
                      <Route path="/upcoming" element={<Upcoming />} />
                      <Route path="/sell" element={<Sell />} />
                      <Route path="/used-bikes" element={<UsedBikes />} />
                      <Route path="/compare" element={<Compare />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/dealer" element={<DealerDashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/customer-care" element={<CustomerCare />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    </main>
                    <AccessibilityWidget />
                    <Chatbot />
                  </div>
                </WishlistProvider>
              </BrowserRouter>
            </LanguageProvider>
          </TooltipProvider>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;