// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import LoadCalculator from "./pages/LoadCalculator";
// import LoadSummary from "./pages/LoadSummary";
// import Packages from "./pages/Packages";
// import Customize from "./pages/Customize";
// import Installers from "./pages/Installers";
// import UserInfo from "./pages/UserInfo";
// import FinalScreen from "./pages/FinalScreen";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/calculator" element={<LoadCalculator />} />
//           <Route path="/summary" element={<LoadSummary />} />
//           <Route path="/packages" element={<Packages />} />
//           <Route path="/customize" element={<Customize />} />
//           <Route path="/installers" element={<Installers />} />
//           <Route path="/user-info" element={<UserInfo />} />
//           <Route path="/final" element={<FinalScreen />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Index from "./pages/Index";
// import LoadCalculator from "./pages/LoadCalculator";
// import LoadSummary from "./pages/LoadSummary";
// import Packages from "./pages/Packages";
// import Customize from "./pages/Customize";
// import Installers from "./pages/Installers";
// import UserInfo from "./pages/UserInfo";
// import FinalScreen from "./pages/FinalScreen";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// // 1. Helper Wrapper: Un-authenticated users ko bahr nikaal kar login screen par bhejega
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = localStorage.getItem('userInfo');
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// // 2. Helper Wrapper: Logged-in users ko dubara login/signup par jaane se rokega aur Home page par rakhega
// const PublicRoute = ({ children }: { children: JSX.Element }) => {
//   const isAuthenticated = localStorage.getItem('userInfo');
//   return !isAuthenticated ? children : <Navigate to="/" replace />; // Login hai to seedha Index (Home) par rakho
// };

// const App = () => {
//   const isAuthenticated = localStorage.getItem('userInfo');

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Website open hote hi agar login hai toh Home screen (Index) dikhao, warna login screen */}
//             <Route 
//               path="/" 
//               element={isAuthenticated ? <Index /> : <Navigate to="/login" replace />} 
//             />

//             {/* Auth Routes */}
//             <Route 
//               path="/login" 
//               element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               } 
//             />
//             <Route 
//               path="/signup" 
//               element={
//                 <PublicRoute>
//                   <Signup />
//                 </PublicRoute>
//               } 
//             />

//             {/* Protected Routes (Bina login koi access nahi kar sakega) */}
//             <Route path="/calculator" element={<ProtectedRoute><LoadCalculator /></ProtectedRoute>} />
//             <Route path="/summary" element={<ProtectedRoute><LoadSummary /></ProtectedRoute>} />
//             <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
//             <Route path="/customize" element={<ProtectedRoute><Customize /></ProtectedRoute>} />
//             <Route path="/installers" element={<ProtectedRoute><Installers /></ProtectedRoute>} />
//             <Route path="/user-info" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
//             <Route path="/final" element={<ProtectedRoute><FinalScreen /></ProtectedRoute>} />

//             {/* Error Route */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;




import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Helper Wrapper: Un-authenticated users ko login par bhejega (Type added)
const ProtectedRoute = ({ user, children }: { user: any; children: React.ReactNode }) => {
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Helper Wrapper: Logged-in users ko login/signup par jaane se rokega (Type added)
const PublicRoute = ({ user, children }: { user: any; children: React.ReactNode }) => {
  return !user ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  // Storage changes ko listen karne ke liye useEffect taake automatic state update ho
  useEffect(() => {
    const handleAuthChange = () => {
      const stored = localStorage.getItem("userInfo");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", handleAuthChange);
    return () => window.removeEventListener("storage", handleAuthChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Real-time sync check */}
            <Route 
              path="/" 
              element={user ? <Index /> : <Navigate to="/login" replace />} 
            />

            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute user={user}>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute user={user}>
                  <Signup />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route path="/calculator" element={<ProtectedRoute user={user}><LoadCalculator /></ProtectedRoute>} />
            <Route path="/summary" element={<ProtectedRoute user={user}><LoadSummary /></ProtectedRoute>} />
            <Route path="/packages" element={<ProtectedRoute user={user}><Packages /></ProtectedRoute>} />
            <Route path="/customize" element={<ProtectedRoute user={user}><Customize /></ProtectedRoute>} />
            <Route path="/installers" element={<ProtectedRoute user={user}><Installers /></ProtectedRoute>} />
            <Route path="/user-info" element={<ProtectedRoute user={user}><UserInfo /></ProtectedRoute>} />
            <Route path="/final" element={<ProtectedRoute user={user}><FinalScreen /></ProtectedRoute>} />

            {/* Error Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;