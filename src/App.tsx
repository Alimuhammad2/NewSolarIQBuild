import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoadCalculator from "./pages/LoadCalculator";
import LoadSummary from "./pages/LoadSummary";
import Packages from "./pages/Packages";
import Customize from "./pages/Customize";
import Installers from "./pages/Installers";
import UserInfo from "./pages/UserInfo";
import FinalScreen from "./pages/FinalScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<LoadCalculator />} />
          <Route path="/summary" element={<LoadSummary />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/installers" element={<Installers />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/final" element={<FinalScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
