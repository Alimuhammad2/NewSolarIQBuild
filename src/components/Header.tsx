// import { Sun } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';

// const Header = () => {
//   const location = useLocation();
//   const isLanding = location.pathname === '/';

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-xl solar-gradient flex items-center justify-center">
//               <Sun className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">SolarIQ</span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-6">
//             <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Home
//             </Link>
//             <Link to="/calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Calculator
//             </Link>
//             <Link to="/installers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
//               Installers
//             </Link>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Link to="/login">
//               <Button variant="ghost" size="sm">Log In</Button>
//             </Link>
//             <Link to="/signup">
//               <Button size="sm">Get Started</Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect } from 'react';
import { Sun, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  
  const [user, setUser] = useState<any>(null);

  // Jab header load hoga toh localStorage se checked karega session ko
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // Location change par bhi safe refresh check karega

  // Logout clear logic
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl solar-gradient flex items-center justify-center">
              <Sun className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SolarIQ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </Link>
            <Link to="/installers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Installers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Dynamic Rendering: Agar User Session mojood hai */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  <span>Hi, {user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              /* Agar user login nahi hai toh aapke normal purane buttons */
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;